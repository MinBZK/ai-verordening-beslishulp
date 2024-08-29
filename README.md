# Beslisboom AI-Verordening bètaversie

Met deze beslisboom stel je vast of de AI-verordening geldt voor jouw overheidsorganisatie. En aan welke vereisten je dan moet voldoen.

- Deze beslisboom is een bètaversie (betekenende dat deze website in ontwikkeling is. Volgende versies ontstaan op een open manier.)
- De informatie is niet compleet en er kunnen fouten in staan.
- Je bent zelf verantwoordelijk voor de informatie die je gebruikt.
- Overleg de uitkomsten van de beslisboom met een expert.
- In de beslisboom staat alleen informatie over de rollen van de overheid als [aanbieder](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst) en als [gebruiksverantwoordelijke](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst).

# AI-act-beslisboom

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/MinBZK/ai-act-decisiontree/main.svg?badge_token=d3dKEK97RwC1II15_W-nng)](https://results.pre-commit.ci/latest/github/MinBZK/ai-act-decisiontree/main?badge_token=d3dKEK97RwC1II15_W-nng)

Deze git repository bevat de beslisboom op basis van de AI Verordening. Het project omvat 2 onderdelen.

1. De beslisboom: [decision-tree.yaml](decision-tree.yaml)
2. Een frontend voor de visualisatie van de beslisboom: [frontend](frontend/)

De Kubernetes deployment code staat bij  [infra](https://github.com/MinBZK/ai-validation-infra/apps/ai-act-beslisboom)

Door deze beslisboom te doorlopen, krijgt uw organisatie inzicht in de volgende vragen:

- Is er sprake van een **AI-systeem**, een **AI-systeem voor algemene doeleinden** of een **AI-model voor algemene doeleinden**?
- Is het systeem/model **open source** of niet?
- Is de AI-verordening van toepassing? Is er sprake van een **uitzonderingsgrond**?
- Binnen welke **risicocategorie** valt het AI-systeem?
- Is er sprake van een **systeemrisico** of **transparantierisico**?
- Bent u een **aanbieder** of een **gebruiksverantwoordelijke** van het AI-systeem?
- Aan welke **verplichtingen** moet u voldoen bij de inzet van het AI-systeem?

Om u te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI Verordening gelinkt per vraag.

## Beslisboom componenten

De beslisboom is gevat in [decision-tree.yaml](decision-tree.yaml). U kunt deze bekijken met elke editor die u fijn vindt.

De beslisboom heeft componenten die vastgelegd zijn in een schema. Zie [schema_decision_tree.json](schemas/schema_decision_tree.json). Dit schema zorgt ervoor dat het systeem weet welke velden verwacht worden.

De beslisboom is opgebouwd uit de volgende componenten:

```sh
version: string           # versie van decisionTree
name: string              # naam van decisionTree
questions: array(Question) # de vragen zoals gedefineerd hieronder

Question:                 # definitie van 1 vraag
  questionId: string      # een unique identifier voor de vraag
  question: string        # de vraag die gesteld wordt
  questionType: enum      # het type vraag
  description: string     # optioneel: een extra opmerking bij de vraag
  source: string          # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string      # optioneel: een link naar de bovengenoemde verwijzing
  answers: array(Answer)  # de mogelijke antwoorden zoals hieronder gedefineerd

Answer:                   # definitie van 1 antwoord
  answer: string          # de text van het antwoord
  nextQuestionId: string  # optioneel: de QuestionId van de volgende vraag
  subresult: string       # optioneel: een tussenresultaat voordat naar de volgende vraag verwezen wordt
  labels: array           # optioneel: labels toegekend aan het bijbehorende tussenresultaat
  result: string          # optioneel: het eindresultaat
  answerComment: string   # optioneel: extra commentaar bij het antwoord

Conclusion:               # definitie van 1 eindconclusie
  conslusion: string      # de eindconclusie
  conclusionComment: string   #optioneel: een extra opmerking bij de conclusie
  obligation: string      # de bij de conclusie bebehorende verplichtingen uit de AI verordening
  source: string          # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string      # optioneel: een link naar de bovengenoemde verwijzing
```

Naast de beslisboom is er ook een [definitions.yaml](definitions.yaml) bestand. Dit bestand bevat alle relevante definities die de beslisboom ondersteunen en extra uitleg nodig hebben, gebaseerd op de [Begrippenlijst van het algoritmekader](https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst). Het verwachte schema van velden is gedocumenteerd in [schema_definitions.json](schemas/schema_definitions.json).

## Frontend

Om door de beslisboom te lopen is een visualizatie tool gemaakt. Met deze tool kunt u door de vragen lopen. De frontend is beschikbaar op deze [website](https://ai-act-decisiontree.apps.digilab.network). Voor nu is er nog een wachtwoord nodig om de website te bekijken. Deze kan bij Ruth worden opgevraagd.

### Frontend locaal draaien

Om de development omgeving te standariseren maken we gebruik van [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).

Als u in de devcontainer zit kunt u de volgende commandos uitvoeren. Voordat dit kan gaat u eerst in de frontend/ folder staan met een terminal.

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

Er is een klein stukje infra code geschreven voor kubernetes zodat de applicaties gehost kan worden. Om dit uit te kunnen voeren heeft u een kubernetes cluster nodig en [kubectl](https://kubernetes.io/docs/tasks/tools/). Dit inatellen laten we buiten beschouwing voor deze readme. Als men het ingesteld heeft kan met het volgende commando uitvoeren.

```sh
kubectl apply -k infra/
```


## Validatie schema

Door het volgende script te runnen, kunt u controlen of het bestand decision-tree.yaml en het bestand definitions.yaml (technisch) valide zijn. Eventuele (syntax)fouten worden hiermee aangegeven.

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
