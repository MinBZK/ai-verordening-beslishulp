<script setup lang="ts">
import { Answer } from '@/models/DecisionTree'
import { ref } from 'vue'
interface Props {
  answers: Array<Answer>
  id?: string
}
defineProps<Props>()

const hoveredIndex = ref<number | null>(null)

defineEmits(['answered'])
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="mt-6 space-y-6">
    <div v-for="(answer, index) in answers" :key="index" class="flex items-center gap-x-3">
      <input
        :key="id + index.toString()"
        aria-roledescription="radio button"
        @click="$emit('answered', answer)"
        :value="id + index.toString()"
        :id="index.toString()"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label :for="index.toString()" class="block text-sm font-medium leading-6 text-gray-900">{{
        answer.answer
      }}</label>
      <ExclamationCircleIcon
        v-if="answer.answerComment !== undefined"
        class="h-6 w-6 text-gray-300"
        aria-hidden="true"
        @mouseover="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      />
      <!-- TODO: on hover show extra comment information -->
      <div class="text-xs font-mono text-gray-400" v-show="hoveredIndex === index">
        {{ answer.answerComment }}
      </div>
    </div>
  </div>
</template>
