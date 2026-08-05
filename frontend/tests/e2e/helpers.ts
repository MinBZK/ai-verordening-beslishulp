import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/** Scan de huidige DOM-state tegen WCAG 2.2 AA en faal met een leesbare opsomming. */
export async function expectNoViolations(page: Page, context: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
  const summary = results.violations
    .map((v) => `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map((n) => `  ${n.html}`).join('\n')}`)
    .join('\n\n')
  expect(results.violations, `axe-schendingen op "${context}":\n\n${summary}`).toEqual([])
}

/** Opent de beslishulp en accepteert de disclaimer, zodat de boom begint bij vraag 1.1. */
export async function startBeslishulp(page: Page) {
  await page.goto('/')
  // De voortgang staat in sessionStorage; zonder dit begint een tweede doorloop binnen
  // dezelfde test halverwege de boom in plaats van bij de disclaimer.
  await page.evaluate(() => sessionStorage.clear())
  await page.reload()
  await page.getByRole('button', { name: /Akkoord en begin/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

/** De antwoordknoppen van de huidige vraag (de knoppen binnen de antwoord-fieldset). */
export function answerButtons(page: Page) {
  return page.locator('fieldset button')
}

/** Het id van de vraag waar de gebruiker nu staat, of null op een conclusiescherm. */
export async function currentQuestionId(page: Page): Promise<string | null> {
  const heading = page.locator('h1[id^="vraag-"]')
  if ((await heading.count()) === 0) {
    return null
  }
  const id = await heading.first().getAttribute('id')
  return id ? id.replace(/^vraag-/, '').replace(/-titel$/, '') : null
}

/** Staat de gebruiker op een conclusiescherm? */
export async function isOnConclusion(page: Page) {
  return (await page.getByRole('heading', { level: 1, name: 'Resultaat' }).count()) > 0
}

/** Beantwoordt de huidige vraag en wacht tot de volgende DOM-state staat. */
export async function answerAndAdvance(page: Page, antwoord?: string) {
  const questionId = await currentQuestionId(page)
  const knop = antwoord
    ? answerButtons(page).filter({ hasText: antwoord }).first()
    : answerButtons(page).first()
  await knop.click()

  const volgende = page.getByRole('button', { name: 'Volgende vraag' })
  if ((await volgende.count()) > 0 && (await volgende.isEnabled())) {
    await volgende.click()
  }

  await expect
    .poll(async () => ((await isOnConclusion(page)) ? 'conclusie' : await currentQuestionId(page)))
    .not.toBe(questionId)
}

/**
 * De representatieve paden door de boom. Volledige boomdekking is niet haalbaar en niet nodig:
 * de UI-componenten zijn eindig, de data is dat niet. Per pad staat hieronder wát het dekt.
 * Een vraag die hier niet genoemd wordt, wordt met het eerste antwoord beantwoord.
 */
export const PADEN = [
  {
    naam: 'uitzonderingsgrond',
    beschrijving:
      'steeds het eerste antwoord: raakt 1.2 (9 antwoorden) en 1.4.1 (3 antwoorden), dus de lijstvariant van de antwoordknoppen, en eindigt in een conclusie in stap 1',
    keuzes: {} as Record<string, string>
  },
  {
    naam: 'niet-van-toepassing',
    beschrijving: 'direct "Nee" op 1.1: kortste pad naar een andere conclusie',
    keuzes: { '1.1': 'Nee' } as Record<string, string>
  },
  {
    naam: 'door-naar-risicogroep',
    beschrijving:
      'loopt door naar stap 2 via het tussenscherm 2.0 en raakt daar opnieuw vragen met meerdere antwoorden',
    keuzes: { '1.5': 'Nee' } as Record<string, string>
  }
]

export type Pad = (typeof PADEN)[number]

/**
 * Loopt een pad af en roept `onState` aan op elke DOM-state (elke vraag én de conclusie).
 * Geeft terug welke vraag-id's onderweg langskwamen.
 */
export async function walkPad(
  page: Page,
  pad: Pad,
  onState: (label: string) => Promise<void>,
  maxSteps = 25
) {
  const bezocht: string[] = []
  await startBeslishulp(page)

  for (let step = 0; step < maxSteps; step++) {
    const questionId = await currentQuestionId(page)
    if (questionId === null) {
      break
    }
    bezocht.push(questionId)
    await onState(`${pad.naam} — vraag ${questionId}`)
    await answerAndAdvance(page, pad.keuzes[questionId])
  }

  expect(
    await isOnConclusion(page),
    `pad "${pad.naam}" bereikte geen conclusie binnen ${maxSteps} stappen; bezocht: ${bezocht.join(', ')}`
  ).toBe(true)
  await onState(`${pad.naam} — conclusie`)

  return bezocht
}

/** Loopt met steeds het eerste antwoord door tot het eerste conclusiescherm. */
export async function walkToConclusion(page: Page, maxSteps = 25) {
  await startBeslishulp(page)
  for (let step = 0; step < maxSteps && !(await isOnConclusion(page)); step++) {
    await answerAndAdvance(page)
  }
  expect(await isOnConclusion(page)).toBe(true)
}
