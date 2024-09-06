<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main>
    <!--    TODO: Hier komt nog een progress tracker-->
    <div class="rvo-form">
      <div class="rvo-layout-column rvo-layout-gap--xl">
        <div class="rvo-form-intro inline-flex items-center">
          <h2 class="utrecht-heading-2">Beslisboom AI-verordering</h2>
          <div
            class="items-center rounded-md rvo-alert rvo-alert--padding-xs rvo-alert--warning">
            <span
              class="utrecht-icon rvo-icon rvo-icon-waarschuwing rvo-icon--xl rvo-status-icon-waarschuwing"
              role="img"
              aria-label="Waarschuwing"
            ></span>
            <div class="utrecht-alert--warning">
              bètaversie
            </div>
          </div>
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
                <li class="utrecht-unordered-list__item"> Voor vragen of opmerkingen over de beslisboom mail je naar: <a
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
      </div>
    </div>
  </main>
</template>
