<script setup lang="ts">
interface Props {
  question: string
}
defineProps<Props>()
</script>

<template>
  <div class="ai-decisiontree ai-decisiontree-question">
    {{ question }}
    <slot />
  </div>
</template>
