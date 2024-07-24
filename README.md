# AI-act-beslisboom

Deze git repository bevat de beslisboom op basis van de AI Verordening. Het project omvat 3 onderdelen.

1. De beslisboom: [decision-tree.yaml](decision-tree.yaml)
2. Een frontend voor de visualisatie van de beslisboom: [frontend](frontend/)
3. Kubernetes deployment code: [infra](infra/)

Door deze beslisboom te doorlopen, krijgt uw organisatie inzicht in de volgende vragen:

- Is er sprake van een **AI-systeem** , een **AI-systeem voor algemene doeleinden** of een **AI-model voor algemene doeleinden**? Is het systeem/model **open source** of niet?
- Is de AI-verordening van toepassing? Is er sprake van een **uitzonderingsgrond**?
- Binnen welke **risicocategorie** valt het AI-systeem? Is er sprake van een **systeemrisico** of **transparantierisico**?
- Bent u een **aanbieder** of een **gebruiksverantwoordelijke** van het AI-systeem?
- Aan welke **verplichtingen** moet u voldoen bij de inzet van het AI-systeem?

Om u te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI Verordening gelinkt per vraag.

## Beslisboom componenten

De beslisboom is gevat in [decision-tree.yaml](decision-tree.yaml). U kunt deze bekijken met elke editor die u fijn vindt.

De beslisboom heeft componenten die vastgelegd zijn in een schema. Zie [schema](schemas/base.schema.json). Dit schema zorgt ervoor dat het systeem weet welke velden verwacht worden.

De beslisboom is opgebouwd uit de volgende componenten:

```sh
version: string           # versie van decisionTree
name: string              # naam van decisionTree
questions: array(Question) # de vragen zoals gedefineerd hieronder

Question:                 # definitie van 1 vraag
  questionId: string      # een unique identifier voor de vraag
  question: string        # de vraag die gesteld wordt
  questionType: enum      # het type vraag
  description: string     # optioneel: een extra beschrijving bij de vraag
  source: string          # optioneel: een verwijzing, naar bijvoorbeeld een wetsartikel
  source_url: string      # optioneel: een link naar de bovengenoemde verwijzing
  answers: array(Answer)  # de mogelijke antwoorden zoals hieronder gedefineerd

Answer:                   # definitie van 1 antwoord
  answer: string          # de text van het antwoord
  nextQuestionId: string  # optioneel de QuestionId van de volgende vraag
  subresult: string       # optioneel: een tussenresultaat voordat naar de volgende vraag verwezen wordt
  labels: array           # optioneel: labels toegekend aan het bijbehorende tussenresultaat
  result: string          # optioneel: het eindresultaat
  answerComment: string   # optioneel: extra commentaar bij het antwoord

```

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

Door het volgende script te runnen, kunt u controlen of het bestand decision-tree.yaml (technisch) valide is. Eventuele (syntax)fouten worden hiermee aangegeven.

```sh
./scripts/validate --schema_file schemas/base.schema.json --yaml_file decision-tree.yaml
```
