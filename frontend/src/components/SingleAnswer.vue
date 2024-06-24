<script setup lang="ts">
import { Answer } from '@/models/DecisionTree'
interface Props {
  answer: Answer
}
defineProps<Props>()

defineEmits(['answered'])
</script>

<template>
  <div class="ai-decisiontree ai-decisiontree-answered">
    <button @click="$emit('answered', answer)">{{ answer.answer }}</button>
  </div>
</template>
