<script setup lang="ts">
interface Props {
  result: string | null
}
defineProps<Props>()
</script>

<template>
  <div v-if="result" class="ai-decisiontree-result">
    {{ result }}
    <slot />
  </div>
</template>
