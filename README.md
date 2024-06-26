# AI-act-beslisboom

Deze git repository bevat de beslisboom op basis van de AI Act. Het project omvat 3 onderdelen.

1. De beslisboom: [decision-tree.yaml](decision-tree.yaml)
2. Een frontend voor de visualisatie van de beslisboom: [frontend](frontend/)
3. Kubernetes deployment code: [infra](infra/)

## Beslisboom

De beslisboom is gevat in [decision-tree.yaml](decision-tree.yaml). U kunt deze bekijken met elke editor die u fijn vindt.

De beslisboom heeft componenten die vast gelegdt zijn in een schema. Zie [schema](schemas/base.schema.json). Dit schema zorgt ervoor dat software/systemen weet welke velden verwacht worden.

De beslisboom is opgebouwd uit de volgende componenten:

```sh
version: string           # versie van decisionTree
name: string              # Naam van decisionTree
questions: array(Question) # de vragen zoals gedefineerd hieronder

Question:                 # Definitie van 1 vraag
  questionId: string      # een unique identifier voor de vraag
  question: string        # De vraag die gesteld wordt
  questionType: enum      # het type vraag
  answers: array(Answer)  # De mogelijke antwoorden zoals hieronder gedefineerd

Answer:                   # definitie van 1 antwoord
  answer: string          # de text van het antwoord
  nextQuestionId: string  # optioneel de QuestionId van de volgende vraag
  result: string          # optioneel de eind conclusie
  answerComment: string   # optioneel extra commentaar bij het antwoord
```

## frontend

Om door de beslisboom te lopen hebben we een visualizatie tool gemaakt. Met deze tool kan je door de vragen lopen. De frontend is beschikbaar op deze [website](https://ai-act-decisiontree.apps.digilab.network). Voor nu heeft men nog een wachtwoord nodig om de website te bekijken. Deze kan je opvragen bij ruth.

### frontend locaal draaien

Om de development omgeving te standariseren maken we gebruik van [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers#_getting-started).

Als men in de devcontainer zit kan met de volgende commandos uitvoeren. voordat dit kan gaat u eerst in de frontend/ folder staan met een terminal.

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

Er is een klein stukje infra code geschreven voor kubernetes zodat de applicaties gehost kan worden. Om dit uit te kunnen voeren heeft u een kubernetes cluster nodig en [kubectl](https://kubernetes.io/docs/tasks/tools/). Dit inatellen laten we buiten beschouwing voor deze readme. Als men het ingesteld heeft kan met het volgende commande uitvoeren.

```sh
kubectl apply -k infra/
```
