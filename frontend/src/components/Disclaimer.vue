<!-- src/components/Disclaimer.vue -->

<script lang="ts">
// Gemeenschappelijke items voor beide Homepage en PDF
const COMMON_DISCLAIMER_ITEMS = [
  {
    text: 'De AI-verordening beslishulp is een betaversie: de informatie is niet compleet en er kunnen fouten in staan. Kom je iets tegen? Mail naar: <a class="rvo-link" href="mailto:ai-verordening@minbzk.nl">ai-verordening@minbzk.nl</a>.',
    plainText: 'De AI-verordening beslishulp is een betaversie: de informatie is niet compleet en er kunnen fouten in staan. Kom je iets tegen? Mail naar: ai-verordening@minbzk.nl'
  },
  {
    text: 'Je doorloopt de AI-verordening beslishulp op basis van je eigen antwoorden. De AI-verordening beslishulp kan niet vaststellen of jouw antwoorden waar zijn of niet.',
    plainText: 'Je doorloopt de AI-verordening beslishulp op basis van je eigen antwoorden. De AI-verordening beslishulp kan niet vaststellen of jouw antwoorden waar zijn of niet.'
  },
  {
    text: 'De AI-verordening beslishulp is geen check op jouw eigen kennis en inzichten en je blijft zelf verantwoordelijk voor de informatie die je gebruikt.',
    plainText: 'De AI-verordening beslishulp is geen check op jouw eigen kennis en inzichten en je blijft zelf verantwoordelijk voor de informatie die je gebruikt.'
  },
  {
    text: 'Wij adviseren de uitkomsten van de AI-verordening beslishulp met andere experts in jouw organisatie te delen en te bespreken.',
    plainText: 'Wij adviseren de uitkomsten van de AI-verordening beslishulp met andere experts in jouw organisatie te delen en te bespreken.'
  }
]

// Items specifiek voor de Homepage (tool zelf)
const HOMEPAGE_SPECIFIC_ITEMS = [
  {
    text: 'De AI-verordening beslishulp is bedoeld voor overheden die AI-systemen aanbieden, of gebruiken onder eigen verantwoordelijkheid.',
    plainText: 'De AI-verordening beslishulp is bedoeld voor overheden die AI-systemen aanbieden, of gebruiken onder eigen verantwoordelijkheid.'
  },
  {
    text: 'Voor vragen of opmerkingen over de AI-verordening beslishulp mail je naar: <a class="rvo-link" href="mailto:ai-verordening@minbzk.nl">ai-verordening@minbzk.nl</a>.',
    plainText: 'Voor vragen of opmerkingen over de AI-verordening beslishulp mail je naar: ai-verordening@minbzk.nl'
  },
  {
    text: 'Om je te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI-verordening gelinkt per vraag. Definities van termen worden getoond als je met je muis eroverheen gaat en zijn terug te vinden op het <a class="rvo-link" href="https://minbzk.github.io/Algoritmekader/soorten-algoritmes-en-ai/definities/#begrippenlijst" target="_blank">Algoritmekader.</a>',
    plainText: 'Om je te helpen bij het beantwoorden van de vragen, zijn relevante overwegingen / artikelen / bijlagen van de AI-verordening gelinkt per vraag. Definities van termen worden getoond als je met je muis eroverheen gaat en zijn terug te vinden op het Algoritmekader.'
  }
]

// Items specifiek voor de PDF export
const PDF_SPECIFIC_ITEMS = [
  {
    text: 'Dit rapport is een momentopname en weerspiegelt de antwoorden die zijn gegeven tijdens het doorlopen van de AI-verordening beslishulp.',
    plainText: 'Dit rapport is een momentopname en weerspiegelt de antwoorden die zijn gegeven tijdens het doorlopen van de AI-verordening beslishulp.'
  },
  {
    text: 'Dit rapport is bedoeld als een hulpmiddel en dient niet als juridisch advies te worden beschouwd.',
    plainText: 'Dit rapport is bedoeld als een hulpmiddel en dient niet als juridisch advies te worden beschouwd.'
  }
]

// Exports voor de Homepage
export const HOMEPAGE_DISCLAIMER_ITEMS = [
  ...COMMON_DISCLAIMER_ITEMS,
  ...HOMEPAGE_SPECIFIC_ITEMS
]

// Exports voor de PDF
export const PDF_DISCLAIMER_ITEMS = [
  ...COMMON_DISCLAIMER_ITEMS,
  ...PDF_SPECIFIC_ITEMS
]

export const HOMEPAGE_INTRO_TEXT = {
  html: `<p class="utrecht-paragraph">Met deze beslishulp kun je nalopen of de AI-verordening geldt
    voor een toepassing die jouw overheidsorganisatie gebruikt. En aan welke vereisten je dan
    moet voldoen voor deze toepassing. Aan het einde van de beslishulp kan je de resultaten
    exporteren in een rapport. Eventuele opmerkingen om context vast te leggen bij een keuze,
    worden in dit rapport opgenomen.</p>
    <p class="utrecht-paragraph">Let op: je moet dus voor elke toepassing apart nalopen of de
    AI-verordening geldt en wat dat betekent. Verder zijn de volgende zaken van belang:</p>`,
  plain: `Met deze beslishulp kun je nalopen of de AI-verordening geldt voor een toepassing die jouw overheidsorganisatie gebruikt. En aan welke vereisten je dan moet voldoen voor deze toepassing. Aan het einde van de beslishulp kan je de resultaten exporteren in een rapport. Eventuele opmerkingen om context vast te leggen bij een keuze, worden in dit rapport opgenomen.

Let op: je moet dus voor elke toepassing apart nalopen of de AI-verordening geldt en wat dat betekent. Verder zijn de volgende zaken van belang:`
}

export const PDF_INTRO_TEXT = {
  html: `<p>Dit rapport bevat de resultaten van de AI-verordening Beslishulp. Het geeft een overzicht van uw antwoorden en de daaruit voortvloeiende conclusies.</p>
    <p>Let op: bij het interpreteren van deze resultaten zijn de volgende punten van belang:</p>`,
  plain: `Dit rapport bevat de resultaten van de AI-verordening Beslishulp. Het geeft een overzicht van uw antwoorden en de daaruit voortvloeiende conclusies.

Let op: bij het interpreteren van de resultaten zijn de volgende punten van belang:`
}

// Constanten voor gebruik in beide UI en PDF
export const SOURCE_INFO = {
  name: 'AI-verordening Beslishulp',
  url: 'https://ai-verordening-beslishulp.apps.digilab.network'
}

export const CONTACT_INFO = {
  email: 'ai-verordening@minbzk.nl'
}
</script>

<script setup lang="ts">
// Setup script voor component-specifieke logica
// We gebruiken hier HOMEPAGE* varianten voor de weergave in de component
</script>

<template>
  <div>
    <!-- Intro text voor de Homepage -->
    <div v-html="HOMEPAGE_INTRO_TEXT.html"></div>

    <!-- Disclaimer list items voor de Homepage -->
    <ul class="rvo-ul rvo-ul--no-margin rvo-ul--no-padding utrecht-unordered-list">
      <li v-for="(item, index) in HOMEPAGE_DISCLAIMER_ITEMS" :key="index" v-html="item.text"></li>
    </ul>
  </div>
</template>
