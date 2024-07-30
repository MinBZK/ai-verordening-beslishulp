<script setup lang="ts">
interface Props {
  id: string
  question: string
  sources: {   source: string;   url: string; }[] | undefined
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
    {{ question }}
    <slot />
  </p>
  <div>
    <!--Sources section-->
    <!--Make an vue component from this?-->
    <DialogTitle v-if='sources' as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-2.5">
      Bronnen
    </DialogTitle>
      <ul class="bottom-5 relative top-2.5">
        <li v-for='source in sources' class="text-sm text-blue-700 underline relative top-2.5">
          <a v-bind:href=source.url target="_blank" >
            {{source.source}}
          </a>
        </li>
      </ul>
  </div>

</template>
