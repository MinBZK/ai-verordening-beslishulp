<script setup lang="ts">
import { load } from 'js-yaml'
import { ref, onMounted, computed } from 'vue'
import { DecisionTree, Questions, Answer } from '../models/DecisionTree'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

const data = ref<Questions>([])
const questionId = ref<String>('0')
const isLoading = ref<bool>(true)
const result = ref<String>('')

onMounted(async () => {
  try {
    const response = await fetch('/decision-tree.yaml')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const text = await response.text()
    const yamlData = load(text)

    const validationResult: t.Validation<any> = DecisionTree.decode(yamlData)

    fold(
      (errors: t.Errors) => console.error('Validation failed:', errors),
      (validData: DecisionTree) => (data.value = validData.questions) // validData is the decoded object
    )(validationResult)
  } finally {
    isLoading.value = false
  }
})

const showQuestion = computed(() => {
  console.log('showQuestion', questionId.value)
  return data.value.find((q) => q.questionId === questionId.value)
})

function givenAnswer(answer: Answer) {
  console.log('givenAnswer', answer.result)
  if (answer.result) {
    result.value = answer.result
  }
  questionId.value = answer.nextQuestionId
}
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <h1 v-else-if="showQuestion === undefined">{{ result }}</h1>
  <div v-else>
    <pre>{{ showQuestion.question }}</pre>
    <li v-for="answer in showQuestion.answers" :key="answer.id">
      <button @click="givenAnswer(answer)">{{ answer.answer }}</button>
    </li>
  </div>
</template>
