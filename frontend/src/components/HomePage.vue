<script setup lang="ts">
import Header from '@/components/Header.vue'
import BetaversionLabel from '@/components/betaversion-label.vue'

const emit = defineEmits(['acceptDisclaimer'])

const StartDecisionTree = '1'

</script>

<template>
<!--  TODO: Here is the logic for the pre-HomePage-->
  <div v-if="StartDecisionTree === '0'">
    <div class="rvo-form h-screen" style="background-color: var(--rvo-color-hemelblauw-150)">
      <div class="rvo-header__logo-wrapper">
        <div class="rvo-logo rvo-header__logo-img">
          <div class="rvo-logo__emblem">
            <img src="@nl-rvo/assets/images/emblem.svg">
          </div>
        </div>
      </div>
      <div class="rvo-layout-column rvo-layout-gap--xl">
        <div class="flex-col rvo-form-intro inline-flex py-28">
          <h2 class="flex justify-center utrecht-heading-1" style="color: var(--rvo-color-logoblauw)">AI ACT</h2>
          <h2 class="flex justify-center utrecht-heading-1" style="color: var(--rvo-color-logoblauw)">Beslisboom</h2>
          <div class="flex justify-center">
            <a class="text-center utrecht-paragraph width rvo-max-width-layout--md py-10"
               style="color: var(--rvo-color-logoblauw-750)">Deze
              beslisboom helpt uw
              organisatie bepalen om welk type AI-systeem het gaat, of het open source is, en of de AI-verordening van
              toepassing is. Daarnaast identificeert het de risicocategorie en verplichtingen, en of u aanbieder of
              gebruiksverantwoordelijke bent.</a>
          </div>
          <div class="flex justify-center">
            <button @click="startDecisionTree" type="button"
                    class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md rvo-link--no-underline">
              Start beslisboom
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Header />
    <main>
      <!--    TODO: Hier komt nog een progress tracker-->
      <div class="rvo-progress-tracker">
      </div>
      <div class="rvo-form">
        <div class="flex items-center rvo-layout-column rvo-layout-gap--xl">
          <div class="flex justify-center rvo-form-intro inline-flex py-5">
            <h2 class="flex justify-center utrecht-heading-2">Beslisboom AI-verordering</h2>
            <BetaversionLabel />
          </div>
          <div class="rvo-layout-column rvo-layout-gap--md">
            <div class="utrecht-form-fieldset rvo-form-fieldset">
              <fieldset
                class="utrecht-form-fieldset__fieldset utrecht-form-fieldset--html-fieldset"
              >
                <p class="utrecht-paragraph">Met deze beslisboom stel je vast of de AI-verordening geldt voor jouw
                  overheidsorganisatie. En aan welke
                  vereisten je dan moet voldoen.</p>
                <ul class="utrecht-unordered-list">
                  <li class="utrecht-unordered-list__item">Deze beslisboom is een betaversie: de informatie is niet
                    compleet en er kunnen fouten in staan.
                  </li>
                  <li class="utrecht-unordered-list__item">Je bent zelf verantwoordelijk voor de informatie die je
                    gebruikt.
                  </li>
                  <li class="utrecht-unordered-list__item">Overleg de uitkomsten van de beslisboom met een expert.</li>
                  <li class="utrecht-unordered-list__item">De beslisboom is bedoeld voor overheden die AI-systemen
                    aanbieden, of gebruiken onder eigen
                    verantwoordelijkheid.
                  </li>
                  <li class="utrecht-unordered-list__item"> Voor vragen of opmerkingen over de beslisboom mail je naar:
                    <a
                      class="rvo-link" href="mailto:ai-verordering@minbzk.nl">
                      ai-verordering@minbzk.nl</a>.
                  </li>
                </ul>
                <p class="utrecht-paragraph">Om u te helpen bij het beantwoorden van de vragen, zijn relevante
                  overwegingen / artikelen / bijlagen
                  van de AI Verordening gelinkt per vraag.</p>
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
  </div>
</template>
