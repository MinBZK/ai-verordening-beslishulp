<script setup lang="ts">
interface Props {
  id: string
  question: string
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
  <p class="mt-1 text-sm leading-6 text-gray-600">
    {{ question }}
    <slot />
  </p>
</template>
