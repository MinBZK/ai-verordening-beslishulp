<script setup lang="ts">
import { load } from 'js-yaml'
import jexl from 'jexl'
import { computed, onMounted, ref } from 'vue'
import { Answer, Conclusions, DecisionTree, Questions, Redirect } from '@/models/DecisionTree'
import { storeToRefs } from 'pinia'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/PathReporter'

import { useQuestionStore } from '@/stores/QuestionStore'

import SingleAnswer from '@/components/SingleAnswer.vue'
import SingleQuestion from '@/components/SingleQuestion.vue'
import Conclusion from '@/components/Conclusion.vue'
import DefaultLoader from '@/components/DefaultLoader.vue'
import DefaultError from '@/components/DefaultError.vue'

const questionStore = useQuestionStore()

const { QuestionId } = storeToRefs(questionStore)

const data_questions = ref<Questions>([])
const data_conclusions = ref<Conclusions>([])
const questionId = QuestionId
const conclusionId = ref<string | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/decision-tree.yaml')
    if (!response.ok) {
      throw new Error(`Error getting questionair data: ${response.status}`)
    }

    const text = await response.text()
    const yamlData = load(text)

    const validationResult: t.Validation<any> = DecisionTree.decode(yamlData)
    fold(
      () => {
        throw new Error(
          `Could not validate data: ${PathReporter.report(validationResult).join('\n')}`
        )
      },
      (validData: DecisionTree) => {
        data_questions.value = validData.questions;
        data_conclusions.value = validData.conclusions;
      }
      // validData is the decoded object
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
  return data_questions.value.find((q) => q.questionId === questionId.value)
})

const findConclusion = computed(() => {
  return data_conclusions.value.find((q) => q.conclusionId === conclusionId.value)
})

function handleNextStep(object: Answer | Redirect){
  if (object.nextQuestionId) {
    questionId.value = String(object.nextQuestionId)
    questionStore.setQuestionId(questionId.value)
  }
  if (object.nextConclusionId) {
    conclusionId.value = String(object.nextConclusionId)
    questionId.value = String(null)
  }
}

async function givenAnswer(answer: Answer) {
  questionStore.addAnswer(questionId.value)
  if (answer.labels) {
    for (let i in answer.labels) {
      questionStore.addLabel(answer.labels[i], questionId.value) // only works if we have one label per question_id
    }
  }
  handleNextStep(answer);
  if (answer.redirects) {
    for (const redirect of answer.redirects) {
      const context = {labels : questionStore.getJsonLabels()};
      const result = await jexl.eval(redirect.if, context);
      if (result) {
        handleNextStep(redirect);
        break  // break out of the loop once one if statement is valid
      }
    }
    // only works if statements don't contradict in the YAML
  }
}

function reset() {
  questionStore.reset()
  conclusionId.value = null
}

function back() {
  questionStore.revertAnswer()
  conclusionId.value = null
}
</script>

<template>
  <div
    class="ai-decisiontree flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <DefaultLoader :loading="isLoading" />

    <DefaultError :error="error" />
    <Conclusion v-if="findConclusion"
                :conclusion="findConclusion.conclusion"
                :obligation="findConclusion.obligation"
                :labels="questionStore.getJsonLabels()"
                :sources="findConclusion.sources"/>
    <div>
      <fieldset>
        <div v-if="currentQuestion" class="ai-decisiontree-form-question">
          <SingleQuestion :question="currentQuestion.question"
                          :id="currentQuestion.questionId"
                          :sources="currentQuestion.sources"/>
          <SingleAnswer
            :answers="currentQuestion.answers"
            :id="currentQuestion.questionId"
            @answered="givenAnswer" class="relative top-5"
          />
        </div>
      </fieldset>
    </div>
  </div>

  <div
    class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <button @click="reset" type="button" class="text-sm font-semibold leading-6 text-gray-900">
      Reset
    </button>
    <button
      @click="back"
      v-if="questionId !== '0'"
      type="button"
      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Terug
    </button>
  </div>
</template>
