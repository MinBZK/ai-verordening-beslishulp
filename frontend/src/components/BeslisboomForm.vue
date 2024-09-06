<script setup lang="ts">
import { load } from 'js-yaml'
import jexl from 'jexl'
import { computed, onMounted, ref } from 'vue'
import { Answer, Conclusions, DecisionTree, Questions, Redirect } from '@/models/DecisionTree'
import { Categories } from '@/models/Categories'
import { storeToRefs } from 'pinia'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import decision_tree_json from '@/assets/decision-tree.json'
import categories_json from '@/assets/categories.json'

import { useQuestionStore } from '@/stores/QuestionStore'

import SingleAnswer from '@/components/SingleAnswer.vue'
import SingleQuestion from '@/components/SingleQuestion.vue'
import Conclusion from '@/components/ConclusionComponent.vue'
import DefaultLoader from '@/components/DefaultLoader.vue'
import DefaultError from '@/components/DefaultError.vue'
import HomePage from '@/components/HomePage.vue'
import Header from '@/components/Header.vue'

const questionStore = useQuestionStore()
const { AcceptedDisclaimer, QuestionId } = storeToRefs(questionStore)

const data_questions = ref<Questions>([])
const data_conclusions = ref<Conclusions>([])
const data_categories = ref<Categories>([])
const questionId = QuestionId
const conclusionId = ref<string | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  // Read in the Data
  try {
    const validationResultDecisionTree: t.Validation<any> = DecisionTree.decode(decision_tree_json)
    fold(
      (errors: t.Errors) => {
        console.log('Validation errors: ' + errors.length)
        let error_locations = []
        for (const error of errors) {
          console.log('error at ' + error.context.map((c) => c.key).join('.'))
          error_locations.push(error.context.map((c) => c.key).join('.'))
        }
        throw new Error(
          `Could not validate data. Problem in yaml for ${error_locations.join(', ')}`
        )
      },
      (validData: DecisionTree) => {
        data_questions.value = validData.questions
        data_conclusions.value = validData.conclusions
      }
    )(validationResultDecisionTree)

    const validationResultCategories: t.Validation<any> = Categories.decode(categories_json)
    fold(
      (errors: t.Errors) => {
        console.log('Validation errors: ' + errors.length)
        let error_locations = []
        for (const error of errors) {
          console.log('error at ' + error.context.map((c) => c.key).join('.'))
          error_locations.push(error.context.map((c) => c.key).join('.'))
        }
        throw new Error(
          `Could not validate data. Problem in yaml for ${error_locations.join(', ')}`
        )
      },
      (validData: Categories) => {
        data_categories.value = validData
      }
    )(validationResultCategories)

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

function handleNextStep(object: Answer | Redirect) {
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
      questionStore.addLabel(answer.labels[i], questionId.value)
    }
  }
  handleNextStep(answer)
  if (answer.redirects) {
    for (const redirect of answer.redirects) {
      const context = { labels: questionStore.getJsonLabels() }
      const result = await jexl.eval(redirect.if, context)
      if (result) {
        handleNextStep(redirect)
        break // break out of the loop once one if statement is valid
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

function acceptDisclaimer() {
  questionStore.acceptDisclaimer()
}
</script>

<template>
  <div v-if="AcceptedDisclaimer == '0'">
    <HomePage />
    <button @click="acceptDisclaimer" type="button"
            class="utrecht-button utrecht-button--primary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
    >
      Accepteer voorwaarden
    </button>
  </div>
  <div v-else>
    <Header />
    <div
      class="ai-decisiontree flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"

    >
      <DefaultLoader :loading="isLoading" />

      <DefaultError :error="error" />
      <Conclusion
        v-if="findConclusion"
        :conclusion="findConclusion.conclusion"
        :obligation="findConclusion.obligation"
        :labels="questionStore.getJsonLabels()"
        :sources="findConclusion.sources"
      />
      <div>
        <fieldset>
          <div v-if="currentQuestion" class="ai-decisiontree-form-question">
            <SingleQuestion
              :question="currentQuestion.question"
              :id="currentQuestion.questionId"
              :sources="currentQuestion.sources"
            />
            <SingleAnswer
              :answers="currentQuestion.answers"
              :id="currentQuestion.questionId"
              @answered="givenAnswer"
              class="relative top-5"
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
<!--   TODO: Replace this button with the Terug naar begin in the top left-->
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
  </div>
</template>
