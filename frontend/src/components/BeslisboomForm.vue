<script setup lang="ts">
import { load } from 'js-yaml'
import { ref, computed, onMounted } from 'vue'
import { DecisionTree, Questions, Answer } from '@/models/DecisionTree'
import { storeToRefs } from 'pinia'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/PathReporter'

import { useQuestionStore } from '@/stores/QuestionStore'

import SingleAnswer from '@/components/SingleAnswer.vue'
import SingleQuestion from '@/components/SingleQuestion.vue'
import FinalResult from '@/components/FinalResult.vue'
import DefaultLoader from '@/components/DefaultLoader.vue'
import DefaultError from '@/components/DefaultError.vue'

const questionStore = useQuestionStore()

const { QuestionId } = storeToRefs(questionStore)

const data = ref<Questions>([])
const questionId = QuestionId
const isLoading = ref(true)
const result = ref<string | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/decision-tree.yaml')
    if (!response.ok) {
      throw new Error(`Error getting questionair data: ${response.status}`)
    }

    //const contenttype = response.headers.get('content-type')
    // if (!contenttype?.includes('text/yaml')) {
    //   throw new Error(`Invalid content type: ${response.headers.get('content-type')}`)
    // }

    const text = await response.text()
    const yamlData = load(text)

    const validationResult: t.Validation<any> = DecisionTree.decode(yamlData)

    fold(
      () => {
        throw new Error(
          `Could not validate data: ${PathReporter.report(validationResult).join('\n')}`
        )
      },
      (validData: DecisionTree) => (data.value = validData.questions) // validData is the decoded object
    )(validationResult)
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'An unknown error occurred'
    }
  } finally {
    isLoading.value = false
  }
})

const currentQuestion = computed(() => {
  const question = data.value.find((q) => q.questionId === questionId.value)
  return question
})

function givenAnswer(answer: Answer) {
  questionStore.addAnswer(questionId.value)
  questionId.value = String(answer.nextQuestionId)

  if (answer.result) {
    result.value = answer.result
  } else {
    questionStore.setQuestionId(questionId.value)
  }
}

function reset() {
  questionStore.reset()
  result.value = null
}

function back() {
  questionStore.revertAnswer()
  result.value = null
}
</script>

<template>
  <div class="ai-decisiontree ai-decisiontree-form">
    <DefaultLoader :loading="isLoading" />

    <FinalResult :result="result" />

    <div v-if="currentQuestion" class="ai-decisiontree-form-question">
      <SingleQuestion :question="currentQuestion.question" />

      <div
        class="ai-decisiontree-form-answer"
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
      >
        <SingleAnswer :answer="answer" @answered="givenAnswer" />
      </div>
    </div>

    <button v-if="questionId !== '0'" @click="back">back</button>
    <button @click="reset">reset</button>

    <DefaultError :error="error" />
  </div>
</template>
