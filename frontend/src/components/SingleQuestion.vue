<script setup lang="ts">
interface Props {
  id: string
  question: string
  sources: {   source: string;   url: string | undefined; }[] | undefined
}
defineProps<Props>()
</script>

<template>
  <legend class="text-sm font-semibold leading-6 text-gray-900">
    Vraag:
    <span
      class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
      >{{ id }}</span
    >
  </legend>
  <p style="white-space: pre-line" class="mt-1 text-sm leading-6 text-gray-600">
    <span v-html="question"></span>
    <slot />
  </p>

  <div>
    <!--Sources section-->
    <!--Make an vue component from this?-->
      <DialogTitle v-if='sources && sources.length' as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">
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
  </div>

</template>
