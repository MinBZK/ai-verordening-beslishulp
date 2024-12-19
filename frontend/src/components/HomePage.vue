<script setup lang="ts">
import Header from '@/components/Header.vue'

const emit = defineEmits(['acceptDisclaimer'])

</script>

<template>
    <Header
      :questionId="'1.2'"
      :disclaimer-screen="'0'"/>
    <main>
      <div class="rvo-progress-tracker">
      </div>
      <div class="rvo-form">
        <div class="flex items-center rvo-layout-column rvo-layout-gap--xl">
          <div class="flex justify-center rvo-form-intro inline-flex py-5">
            <h2 class="flex justify-center utrecht-heading-2">Beslishulp AI-verordening</h2>
          </div>
          <div class="rvo-layout-column rvo-layout-gap--md rvo-max-width-layout rvo-max-width-layout--lg">
            <div class="utrecht-form-fieldset rvo-form-fieldset">
              <fieldset
                class="utrecht-form-fieldset__fieldset utrecht-form-fieldset--html-fieldset"
              >
                <p class="utrecht-paragraph">Met deze beslishulp kun je nalopen of de AI-verordening geldt
                  voor een toepassing die jouw overheidsorganisatie gebruikt. En aan welke vereisten je dan
                  moet voldoen voor deze toepassing. Let op: je moet dus voor elke toepassing apart nalopen
                  of de AI-verordening geldt en wat dat betekent. Verder zijn de volgende zaken van belang:</p>
                <ul class="rvo-ul rvo-ul--no-margin rvo-ul--no-padding utrecht-unordered-list">
                  <li>Deze beslishulp is een betaversie: de informatie is niet compleet en er kunnen fouten in staan.
                    Kom je iets tegen? Mail naar:
                    <a
                      class="rvo-link" href="mailto:ai-verordening@minbzk.nl">
                      ai-verordening@minbzk.nl</a>.
                  </li>
                  <li>Je doorloopt de beslishulp op basis van je eigen antwoorden. De beslishulp kan niet vaststellen of jouw antwoorden waar zijn of niet.
                  </li>
                  <li>De beslishulp is geen check op jouw eigen kennis en inzichten en je blijft zelf verantwoordelijk voor de informatie die je gebruikt.</li>
                  <li>Wij adviseren de uitkomsten van de beslishulp met andere experts in jouw organisatie te delen en te bespreken.</li>
                  <li>De beslishulp is bedoeld voor overheden die AI-systemen
                    aanbieden, of gebruiken onder eigen
                    verantwoordelijkheid.
                  </li>
                  <li> Voor vragen of opmerkingen over de beslishulp mail je naar:
                    <a
                      class="rvo-link" href="mailto:ai-verordening@minbzk.nl">
                      ai-verordening@minbzk.nl</a>.
                  </li>
                </ul>
                <p class="utrecht-paragraph">Om je te helpen bij het beantwoorden van de vragen, zijn relevante
                  overwegingen / artikelen / bijlagen
                  van de AI-verordening gelinkt per vraag. Definities van termen worden laten zien als je met je muis
                  eroverheen gaat en zijn terug te vinden op het
                  <a class="rvo-link" href="https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/?h=definitie" target="_blank">
                      Algoritmekader.
                  </a>
                  </p>
              </fieldset>
            </div>
          </div>
          <div class="py-5 px-5">
            <button @click="$emit('acceptDisclaimer')" type="button"
                    class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md rvo-link--no-underline">
              Accepteer voorwaarden
            </button>
          </div>
        </div>

      </div>

    </main>
</template>
