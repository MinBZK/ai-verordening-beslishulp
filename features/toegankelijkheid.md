# Toegankelijkheid (WCAG 2.2 AA) in CI

Deze beslishulp is een overheidsdienst. Daarmee geldt het *Besluit digitale toegankelijkheid
overheid* → EN 301 549 → WCAG 2.1 AA als wettelijke ondergrens, met WCAG 2.2 AA als doel.
Automatische tooling vervangt geen formele audit — ongeveer een derde tot de helft van alle
WCAG-issues is machinaal vindbaar. Wat de tooling hieronder wél doet: voorkomen dat de dienst
tussen twee audits in wegzakt.

## De drie lagen

| Laag | Tool | Draait | Ziet |
|---|---|---|---|
| 1 | `eslint-plugin-vuejs-accessibility` | `npm run lint` (~2s) | template-niveau, vóór het commit-moment; geen runtime-state |
| 2 | `vitest` + `@vue/test-utils` + `vitest-axe` | `npm run test:unit` (~14s) | componentstate; **geen** kleurcontrast (jsdom rendert geen pixels) |
| 3 | Playwright + `@axe-core/playwright` | `npm run test:e2e` (~35s) | echte browser: contrast, focus-volgorde, reflow, per beslisboom-stap |

Alle drie draaien op elke pull request via `.github/workflows/frontend-checks.yaml`.

## Laag 1 — statische linting

`frontend/eslint.config.js` gebruikt `pluginVue.configs['flat/recommended']` plus
`pluginVueA11y.configs['flat/recommended']`. De a11y-regels staan hard op `error`. Elke afwijking
van de standaardinstellingen staat met reden in dat bestand:

- `vue/multi-word-component-names`: **uit** — hernoemen raakt elk importpad zonder functionele winst.
- `@typescript-eslint/no-explicit-any`: **warn** — de resterende `any`-types stapsgewijs typeren is aparte scope.
- `vue/no-v-html`: **warn** — vraag- en conclusietekst komt als HTML uit de YAML en móét als HTML
  gerenderd worden. Zie het handmatige controlepunt hieronder.
- `vuejs-accessibility/label-has-for`: `some: ['nesting', 'id']` — `for` + `id` is genoeg.
- `vuejs-accessibility/no-redundant-roles`: `role="list"` op een `<ul>` blijft toegestaan, want
  `.no-list` zet `list-style: none` en dan laat Safari/VoiceOver de lijstsemantiek vallen.

## Laag 2 — componenttests

Eén spec per component in `frontend/src/components/*.spec.ts`. Elke spec mount de component en
draait axe (`src/test/a11y.ts`), plus gedragstests voor wat axe *niet* ziet — een ontbrekende
`aria-pressed` is geen schending, alleen onvolledige informatie.

Twee dingen om te weten:

- **`src/test/mount.ts` zet de globale properties.** `showExplanationField`, `showExportPDF` en
  `showCloseOnEnd` worden in `main.ts` van `data-`attributen gelezen. In tests bestaan die niet;
  zonder deze defaults is de waarde `undefined` en test je stilzwijgend maar één tak.
- **Paginabrede axe-regels staan uit** (`region`, `landmark-one-main`, `html-has-lang`, `bypass`,
  `page-has-heading-one`): een component is geen pagina. Die regels draaien in laag 3.

`vitest.config.ts` staat los van `vite.config.ts` en zet `css.postcss.plugins` leeg, net als
`vite.config.ts` doet: `frontend/postcss.config.js` is CommonJS terwijl `package.json`
`"type": "module"` is, waardoor vite hem niet kan laden.

## Laag 3 — Playwright-walk

`frontend/tests/e2e/`:

| Bestand | Dekt |
|---|---|
| `a11y-walk.spec.ts` | axe-scan op élke DOM-state van drie representatieve paden + het exportformulier |
| `keyboard.spec.ts` | volledige muisloze doorloop, skip-link, zichtbare focusindicator, Escape op de dialoog |
| `focus-management.spec.ts` | focus naar de kop van de nieuwe vraag, `aria-live`-aankondiging, geen ongevraagde focusverplaatsing |
| `reflow.spec.ts` | 320px en 400% zoom: geen horizontale scrollbalk, geen afgekapte knoppen |

De paden staan in `tests/e2e/helpers.ts` (`PADEN`), elk met een beschrijving van wát het dekt.
**Dit is bewust geen volledige boomdekking:** `decision-tree.yaml` is groot en verandert continu,
de UI-componenten zijn eindig. De paden raken samen alle varianten die de templates kennen
(≤2 antwoorden vs. lijst, tussenscherm, meerdere conclusies), maar niet de inhoud van elke vraag.
De walk logt welke states gescand zijn, zodat "groen" niet als "alles gedekt" gelezen wordt.

De tests draaien tegen `vite preview` op een productiebuild, niet tegen de dev-server: de build
inlinet alles tot één `index.js`, en dát is wat afnemers inbedden.

## Lokaal draaien

```bash
cd frontend
npm ci
npm run lint          # laag 1 (npm run lint:fix repareert)
npm run test:unit     # laag 2
npx playwright install --with-deps chromium
npm run test:e2e      # laag 3
```

Let op: `decision-tree.json` en `categories.json` in `src/assets/` zijn build-artefacten. Draai
`python script/inject_definitions_in_decision_tree.py` en `python script/convert_categories.py`
vanuit de repo-root als je met verse data wilt testen.

## Wat de automatisering niet dekt

Zie de toegankelijkheidschecklist in [CONTRIBUTING.md](../CONTRIBUTING.md#toegankelijkheid).
De automatisering hierboven levert bewijsmateriaal; de toegankelijkheidsverklaring op
toegankelijkheidsverklaring.nl blijft handwerk.
