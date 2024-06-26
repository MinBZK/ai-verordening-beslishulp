<script setup lang="ts">
import { Answer } from '@/models/DecisionTree'
interface Props {
  answers: Array<Answer>
}
defineProps<Props>()

defineEmits(['answered'])
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="mt-6 space-y-6">
    <div v-for="(answer, index) in answers" :key="index" class="flex items-center gap-x-3">
      <input
        aria-roledescription="radio button"
        @click="$emit('answered', answer)"
        :id="index"
        :name="index"
        :checked="false === true"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
        v-model="test"
      />
      <label :for="index" class="block text-sm font-medium leading-6 text-gray-900">{{
        answer.answer
      }}</label>
      <ExclamationCircleIcon
        v-if="answer.answerComment !== undefined"
        class="h-6 w-6 text-gray-300"
        aria-hidden="true"
      />
      <div></div>
    </div>
  </div>
</template>

<!-- <button
      type="button"
      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      @click="$emit('answered', answer)"
    >
      {{ answer.answer }}
    </button>
    <div v-if="answer.answerComment !== undefined">{{ answer.answerComment }}</div>
  </div> -->
