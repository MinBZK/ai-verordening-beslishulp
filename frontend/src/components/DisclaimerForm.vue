<script setup lang="ts">

import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
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
          >Beslisboom AI-Verordening <dfn id="betaversie"><abbr title="Deze website is in ontwikkeling. Volgende versies ontstaan op een open manier. Iedereen mag opmerkingen of suggesties geven.">bètaversie</abbr> </dfn> Disclaimer
          </DialogTitle
          >
          <div class="mt-2 text-gray-500">
            <p class="font-bold">Met deze beslisboom stel je vast of de AI-verordening geldt voor jouw overheidsorganisatie. En aan welke
              vereisten je dan moet voldoen.</p>
            <ul style="list-style-type:disc;">
              <li>Deze beslisboom is een <dfn id="betaversie"><abbr title="Deze website is in ontwikkeling. Volgende versies ontstaan op een open manier. Iedereen mag opmerkingen of suggesties geven.">bètaversie</abbr> </dfn>.</li>
              <li>De informatie is niet compleet en er kunnen fouten in staan.</li>
              <li>Je bent zelf verantwoordelijk voor de informatie die je gebruikt.</li>
              <li>Overleg de uitkomsten van de beslisboom met een expert.</li>
              <li>In de beslisboom staat alleen informatie over de rollen van de overheid als <a
                class=underline
                href="https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst">aanbieder</a>
                en als <a
                  class=underline
                  href="https://minbzk.github.io/Algoritmekader/overhetalgoritmekader/definities/#begrippenlijst">gebruiksverantwoordelijke</a>.
              </li>
            </ul>
            <p>Voor vragen of opmerkingen over de beslisboom mail je naar: <a class=underline href="mailto::ai-verordening@minbzk.nl">ai-verordening@minbzk.nl</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </DialogPanel>
</template>
