<script setup lang="ts">
interface Props {
  error?: string | null
}
defineProps<Props>()
</script>

<template>
  {{ error }}
  <div v-if="error" class="ai-decisiontree-error">
    {{ error }}
    <slot />
  </div>
</template>
