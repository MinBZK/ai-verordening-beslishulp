# AI-act-beslisboom

Repository voor de beslisboom op basis van de AI Act

De beslisboom bestaat uit meerdere json files: een hoofdbestand en meerdere sub-trees die in aparte files staan zodat ze geïnclude kunnen worden.
Er wordt een naming-convention gebruikt om onderscheid te maken: wanneer de naam van een json bestand eindigt in -compressed.json, dan bevat het referenties naar andere json bestanden (sub-trees). Wanneer het niet eindigt op -compressed.json (maar gewoon .json) dan staan er geen referenties in.

Door middel van de aanwezige bashscripts kan de volledige beslisboom worden gegenereerd (decision-tree.json)

## frontend

For the frontend we created a minimal vuejs application.

### Project Setup

Go into the frontend folder and execute the following commands.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
