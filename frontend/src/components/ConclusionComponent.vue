<script setup lang="ts">
interface Props {
  conclusion: string | null
  obligation: string | null
  labels: string[] | null
  sources: {   source: string;   url: string | undefined; }[] | undefined
}
defineProps<Props>()

import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <DialogPanel v-if="conclusion" class="">
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
        >
          <ExclamationTriangleIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <!--Conclusion section-->
          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
            Conclusie</DialogTitle>
          <p class="text-sm text-gray-500">
            {{ conclusion }}
            <slot />
          </p>

          <!--Obligation section-->
          <DialogTitle as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">
            Verplichtingen</DialogTitle>
          <p style="white-space: pre-line" class="text-sm text-gray-500 relative top-5">
            {{ obligation }}
            <slot />
          </p>

          <!--Sources section-->
          <!--Make an vue component from this?-->
          <DialogTitle v-if='sources' as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">
            Bronnen
          </DialogTitle>
          <ul>
            <li v-for='(source, index) in sources' :key="index" class="relative top-5 text-sm">
              <!-- When source.url exists -->
              <a v-if="source.url" :href="source.url" target="_blank" class="text-blue-700 underline">
                {{ source.source }}
                <slot />
              </a>
              <!-- When source.url does not exist -->
              <span v-else class="text-gray-700">
                {{ source.source }}
                <slot />
              </span>
            </li>
          </ul>

          <!--Labels section-->
          <DialogTitle as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">
            Labels</DialogTitle>
          <p class="text-sm text-gray-500 relative top-5">
            {{ labels }}
            <slot />
          </p>

          <!--Contact section-->
          <DialogTitle as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">
            Contact</DialogTitle>
          <p class="text-sm text-gray-500 relative top-5">
            Mocht je vragen of opmerkingen hebben naar aanleiding van deze beslisboom, mail dan gerust naar ai-verordening@minbzk.nl.
            <slot />
          </p>

        </div>
      </div>
    </div>
  </DialogPanel>
</template>
