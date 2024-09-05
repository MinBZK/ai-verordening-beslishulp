<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import '@nl-rvo/component-library-css/dist/index.css'
import '@nl-rvo/assets/fonts/index.css'
import '@nl-rvo/assets/icons/index.css'
import '@nl-rvo/design-tokens/dist/index.css'

</script>

<template>
  <header class="header">
    <div class="rvo-header__logo-wrapper">
      <div class="rvo-logo rvo-header__logo-img">
        <div class="rvo-logo__emblem">
          <img src="@nl-rvo/assets/images/emblem.svg">
        </div>
      </div>
    </div>
    <div class="rvo-layout-column rvo-layout-gap--2xl">
      <div class="rvo-topnav__background rvo-topnav__background--horizontal-rule">
        <div class="rvo-max-width-layout rvo-max-width-layout--md rvo-max-width-layout-inline-padding--none">
          <nav class="rvo-topnav rvo-topnav--lg">
            <ul class="rvo-topnav__list">
              <li class="rvo-topnav__item">
                <a class="rvo-link rvo-topnav__link rvo-link--logoblauw" href="#">
                <span
                  class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
                  role="img"
                  aria-label="Terug"
                ></span>
                  Terug naar naar begin
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <DialogPanel class="">
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
        >
          <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left text-gray-500">
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
          >Beslisboom AI-Verordening <dfn id="betaversie"><abbr
            title="Deze website is in ontwikkeling. Volgende versies ontstaan op een open manier. Iedereen mag opmerkingen of suggesties geven.">bètaversie</abbr>
          </dfn>
          </DialogTitle
          >
          <div class="mt-2 text-gray-500">
            <p class="font-bold">Met deze beslisboom stel je vast of de AI-verordening geldt voor jouw
              overheidsorganisatie. En aan welke
              vereisten je dan moet voldoen.</p>
            <ul style="list-style-type:disc;">
              <li>Deze beslisboom is een betaversie: de informatie is niet compleet en er kunnen fouten in staan.</li>
              <li>Je bent zelf verantwoordelijk voor de informatie die je gebruikt.</li>
              <li>Overleg de uitkomsten van de beslisboom met een expert.</li>
              <li>De beslisboom is bedoeld voor overheden die AI-systemen aanbieden, of gebruiken onder eigen
                verantwoordelijkheid.
              </li>
            </ul>
            <p>Voor vragen of opmerkingen over de beslisboom mail je naar: <a class=underline
                                                                              href="mailto::ai-verordening@minbzk.nl">ai-verordening@minbzk.nl</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </DialogPanel>
</template>
