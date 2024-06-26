<script setup lang="ts">
import { Answer } from '@/models/DecisionTree'
interface Props {
  answer: Answer
}
defineProps<Props>()

defineEmits(['answered'])
</script>

<template>
  <div class="ai-decisiontree-answered">
    <button @click="$emit('answered', answer)">{{ answer.answer }}</button>
    <div v-if="answer.answerComment !== undefined">{{ answer.answerComment }}</div>
  </div>
</template>
