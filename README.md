# Beslishulp AI-Verordening bètaversie

**Met deze beslishulp stel je vast of de AI-verordening geldt voor jouw overheidsorganisatie. En aan welke vereisten je dan moet voldoen.**

- Deze beslishulp is een bètaversie (betekenende dat deze website in ontwikkeling is. Volgende versies ontstaan op een open manier.)
- De informatie is niet compleet en er kunnen fouten in staan.
- Je bent zelf verantwoordelijk voor de informatie die je gebruikt.
- Overleg de uitkomsten van de beslishulp met een expert.
- In de beslishulp staat alleen informatie over de rollen van de overheid als [aanbieder](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst) en als [gebruiksverantwoordelijke](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst).

Voor vragen of opmerkingen over de beslishulp mail je naar: [ai-verordening@minbzk.nl](mailto::ai-verordening@minbzk.nl).

# AI-Verordening-Beslishulp

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/MinBZK/ai-verordening-beslishulp/main.svg?badge_token=d3dKEK97RwC1II15_W-nng)](https://results.pre-commit.ci/latest/github/MinBZK/ai-verordening-beslishulp/main?badge_token=d3dKEK97RwC1II15_W-nng)

Deze git repository bevat de beslishulp op basis van de AI-verordening.
Het AI-validatie Team heeft deze tool ontwikkeld, maar is niet verantwoordelijk voor de juridische inhoud van de beslishulp. Voor meer informatie over het AI Validatie Team, bezoek de [site van het AI-validatieteam](https://minbzk.github.io/ai-validation/). Voor vragen over de juridische inhoud, neem contact op met de experts via ai-verordening@minbzk.nl.

Het project omvat de volgende 3 onderdelen:

1. De beslishulp: [decision-tree.yaml](decision-tree.yaml)
3. De definities vanuit het Algoritmekader [definitions.yaml](definitions.yaml)
2. Een frontend voor de visualisatie van de beslishulp: [frontend](frontend/)

De Kubernetes deployment code staat bij  [infra](https://github.com/MinBZK/ai-validation-infra/apps/ai-verordening-beslishulp)

Door deze beslishulp te doorlopen, krijgt uw organisatie inzicht in de volgende vragen:

- Bent u een **aanbieder**, **gebruiksverantwoordelijke**, **importeur** en/of **distributeur**?
- Is er sprake van een **AI-systeem**, een **AI-systeem voor algemene doeleinden**, een **AI-model voor algemene doeleinden**, een **impactvol algoritme**, een **niet-impactvol algoritme** of wellicht **geen algoritme**?
- Binnen welke risicogroep valt het AI-systeem? **hoog-risico AI**, **geen hoog-risico AI**, **verboden AI**, of is er een **uitzondering van toepassing** waardoor de AI-verordening niet geldt?
- Is er sprake van een **systeemrisico** of **geen systeemrisico**?
- Is er sprake van een **transparantieverplichting** of **geen transparantieverplichting**?
- Is de toepassing **open-source** ontwikkeld of **geen open-source**?
- Indien er een conformiteitsbeoordeling moet worden uitgevoerd, is er sprake van een **beoordeling door derde partij** of is dit **niet van toepassing**?
- Is de toepassing operationeel? Is de toepassing **in gebruik** of **in ontwikkeling**?

De volgende tabel deelt de labels in per categorie.
Gezamenlijk zorgen de opgehaalde labels ervoor dat de toepassing binnen een bepaald AI-verordening profiel valt, waardoor specifieke verplichtingen van toepassing zijn.


| Categorie                    | Subcategorie                 | Label                               |
|------------------------------|------------------------------|-----------------------------------|
| Geldt de AI-verorderning voor mij? | Soort toepassing             | AI-systeem                       |
|                              |                              | AI-systeem voor algemene doeleinden |
|                              |                              | AI-model voor algemene doeleinden |
|                              |                              | geen algoritme                   |
|                              |                              | niet-impactvol algoritme         |
|                              |                              | impactvol-algoritme              |
|                              | Operationeel                 | in gebruik                       |
|                              |                              | in ontwikkeling                  |
| Zo ja, in welke risicogroep valt de toepassing? | Risicogroep                  | hoog-risico AI                   |
|                              |                              | geen hoog-risico AI              |
|                              |                              | verboden AI                      |
|                              |                              | uitzondering van toepassing       |
|                              | Rol                          | aanbieder                        |
|                              |                              | gebruiksverantwoordelijke        |
|                              |                              | importeur                        |
|                              |                              | distributeur                     |
|                              | Systeemrisico                | systeemrisico                    |
|                              |                              | geen systeemrisico               |
|                              | Transparantieverplichting    | transparantieverplichting        |
|                              |                              | geen transparantieverplichting   |
|                              | Open-source                  | open-source                      |
|                              |                              | geen open-source                 |
|                              | Conformiteitsbeoordelingsinstantie | beoordeling door derde partij   |
|                              |                              | niet van toepassing              |


Om u te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI-verordening gelinkt per vraag.

## Beslishulp componenten

De beslishulp is gevat in [decision-tree.yaml](decision-tree.yaml). U kunt deze bekijken met elke editor die u fijn vindt.

De beslishulp heeft componenten die vastgelegd zijn in een schema. Zie [schema_decision_tree.json](schemas/schema_decision_tree.json). Dit schema zorgt ervoor dat het systeem weet welke velden verwacht worden.

De beslishulp is opgebouwd uit de volgende componenten:

```sh
version: string              # versie van decisionTree
name: string                 # naam van decisionTree
questions: array(Question)   # de vragen zoals gedefineerd hieronder

Question:                    # definitie van 1 vraag
  questionId: string         # een unique identifier voor de vraag
  question: string           # de vraag die gesteld wordt
  category: string           # in welke categorie de vraag valt
  subcategory: string        # subcategorie van de vraag
  explanation: string        # uitleg bij de vraag
  description: string        # optioneel: een extra opmerking bij de vraag
  sources: array(Source)     # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel met een url
  answers: array(Answer)     # de mogelijke antwoorden zoals hieronder gedefineerd

Answer:                      # definitie van 1 antwoord
  answer: string             # de text van het antwoord
  nextQuestionId: string     # optioneel: de QuestionId van de volgende vraag
  nextConclusionId: string   # optioneel: de ConclusionId van de conclusie
  subresult: string          # optioneel: een tussenresultaat voordat naar de volgende vraag verwezen wordt
  labels: array              # optioneel: labels toegekend aan het bijbehorende tussenresultaat
  answerComment: string      # optioneel: extra commentaar bij het antwoord
  redirect: array(Redirect)  # optioneel: array van doorverwijzingen met condities

Redirect:                    # definitie van een doorverwijzing
  nextQuestionId: string     # optioneel: de QuestionId van de volgende vraag
  nextConclusionId: string   # optioneel: de ConclusionId van de eindconclusie
  if: string                 # conditie voor de doorverwijzing

Conclusion:                  # definitie van 1 eindconclusie
  conclusion: string         # de eindconclusie
  conclusion_id: string      # een unique identifier voor de conclusie
  conclusionComment: string  # optioneel: een extra opmerking bij de conclusie
  obligation: string         # de bij de conclusie bebehorende verplichtingen uit de AI-verordening
  sources: array(Source)     # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string         # optioneel: een link naar de bovengenoemde verwijzing

Source:                      # definitie van een bronverwijzing
  source: string             # de bron referentie
  url: string                # optioneel: URL naar de bron
```

Naast de beslishulp is er ook een [definitions.yaml](definitions.yaml) bestand. Dit bestand bevat alle relevante definities die de beslishulp ondersteunen en extra uitleg nodig hebben, gebaseerd op de [Begrippenlijst van het algoritmekader](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst). Het verwachte schema van velden is gedocumenteerd in [schema_definitions.json](schemas/schema_definitions.json).

## Beslishulp diagram

De beslishulp is schematisch weergegeven verschillende diagrammen:

1. [een doorklikbaar diagram](https://minbzk.github.io/ai-verordening-beslishulp/mermaid_graphs/decision-tree-main.html): in dit diagram is de beslishulp op een versimpelde manier weergeven. Dit diagram bevat de volgende componenten:

    - donkerblauwe rechthoeken: dit zijn doorklikbare componenten die doorverwijzen naar een volgende categorie uit de beslishulp.
    - lichtblauwe rechthoeken: dit zijn de 'labels' uit de beslishulp. De labels geven de karakteristieken die u door de beslishulp te doorlopen kunt verzamelen weer.
    - donkerblauwe cirkels: dit zijn de vragen uit de beslishulp. Wanneer u op een cirkel klikt, verschijnt de volledige vraag in een pop-up op het scherm. Deze kan vervolgens weer weg worden geklikt door rechtsboven op het kruisje te klikken.
    - witte hexagons met groene rand: dit zijn de conclusies uit de beslishulp. Wanneer u op een hexagon klikt, verschijnen de bij de conclusie behorende verplichtingen in een pop-up op het scherm.

    U kunt terug naar het vorige diagram door de vorige pagina-knop in uw browser te gebruiken.

2. een [overzichtsdiagram](https://minbzk.github.io/ai-verordening-beslishulp/mermaid_graphs/decision-tree-complete.html): in dit diagram is de gehele beslishulp gevat. Dit diagram is niet doorklikbaar. De vragen zijn gegroepeerd categorieen, weergeven in witte rechthoeken met groene randen.

Let op: de diagrammen kunnen het beste in Chrome, Safari of Microsoft Edge worden geopend.


## Frontend

Om door de beslishulp te lopen is een visualizatie tool gemaakt. Met deze tool kunt u door de vragen lopen. De frontend is beschikbaar op deze [website](https://ai-verordening-beslishulp.apps.digilab.network).

### Frontend lokaal draaien

Om de development omgeving te standaardiseren maken we gebruik van [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).

Als u in de devcontainer zit kunt u de volgende commando's uitvoeren. Voordat dit kan gaat u eerst in de frontend/ folder staan met een terminal.

Start de tool:

```sh
npm run dev
```

Na het starten is de tool beschikbaar op deze [site](http://localhost:5173)

### Bouwen van de frontend

We maken gebruik van containers zodat de applicatie overal gedraaid kan worden waar u containers kan draaien. Een voorbeeld hiervan in kubernetes. Voordat u dit kan doen moet men eerst [docker](https://docs.docker.com/get-docker/) installeren.

Om de container te bouwen kunt u het volgende doen:

```sh
docker compose build
```

Om de gebouwde container te starten kan u het volgende doen:

```sh
docker compose up
```

Nu is de website beschikbaar op deze locale [site](http://localhost:9090)

## Infra

Er is een klein stukje infra code geschreven voor kubernetes zodat de applicaties gehost kan worden. Om dit uit te kunnen voeren heeft u een kubernetes cluster nodig en [kubectl](https://kubernetes.io/docs/tasks/tools/). Dit instellen laten we buiten beschouwing voor deze readme. Als men het ingesteld heeft kan met het volgende commando uitvoeren.

```sh
kubectl apply -k infra/
```


## Validatie schema

Door het volgende script te runnen, kunt u controleren of het bestand decision-tree.yaml en het bestand definitions.yaml (technisch) valide zijn. Eventuele (syntax)fouten worden hiermee aangegeven.

```sh
./script/validate --file_pairs schemas/schema_decision_tree.json:decision-tree.yaml schemas/schema_definitions.json:definitions.yaml
```

## Pre-commit

Om pre-commit lokaal in te schakelen, voer het volgende uit:
```sh
pip install pre-commit
pre-commit install
```

Bij volgende commits zullen alle hooks worden uitgevoerd.

Je kunt alle hooks handmatig als volgt uitvoeren:
```sh
pre-commit run --all-files
```

Pre-commit runt ook als CI/CD check step voor het mergen naar `main`.
