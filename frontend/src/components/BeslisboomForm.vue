<script setup lang="ts">
import jexl from 'jexl'
import { computed, onMounted, ref } from 'vue'
import { Answer, Conclusions, DecisionTree, Questions, Redirect } from '@/models/DecisionTree'
import { Categories, Category } from '@/models/Categories'
import { storeToRefs } from 'pinia'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import decision_tree_json from '@/assets/decision-tree.json'
import categories_json from '@/assets/categories.json'

import { useQuestionStore } from '@/stores/QuestionStore'
import { useCategoryStore } from '@/stores/CategoryStore'

import Question from '@/components/Question.vue'
import Conclusion from '@/components/Conclusion.vue'
import DefaultLoader from '@/components/DefaultLoader.vue'
import DefaultError from '@/components/DefaultError.vue'
import HomePage from '@/components/HomePage.vue'
import Header from '@/components/Header.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'

const questionStore = useQuestionStore()
const { AcceptedDisclaimer, QuestionId } = storeToRefs(questionStore)

const categoryStore = useCategoryStore()
const { categoryState } = storeToRefs(categoryStore)

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
    // Read in the decision tree json
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

    // Read in the categories json
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

const currentCategory = computed(() => {
  // TODO: this is calculated with each refresh, this should be only also when handle next step
  var versions = questionId.value.split('.')
  let category: Category | undefined

  // TODO: check with past category, if changed call CategoryStore
  if (questionId.value === '0') {
    category = data_categories.value.find((q) => q.questionId === '0')
  } else {
    if (versions.length >= 2) {
      // First try to find topic on minor version
      category = data_categories.value.find((q) => q.questionId === versions[0] + '.' + versions[1])
      if (category === undefined) {
        // When not exist, use the major version (patch versions currently does not exist)
        category = data_categories.value.find((q) => q.questionId === versions[0])
      }
    }
  }
  categoryStore.updateCurrentCategory(category.topic)
  return category
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
  categoryStore.reset()
  conclusionId.value = null
}

function back() {
  questionStore.revertAnswer()
  categoryStore.revertCurrentCategory()
  conclusionId.value = null
}

function acceptDisclaimer() {
  questionStore.acceptDisclaimer()
}

</script>

<template>
  <div v-if="AcceptedDisclaimer == '0'">
    <HomePage />
    <!--    TODO: move this to child with emit pattern??-->
    <div class="py-5 px-5">
      <button @click="acceptDisclaimer" type="button"
              class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md rvo-link--no-underline"
      >
        Accepteer voorwaarden
      </button>
    </div>
  </div>
  <div v-else>
    <Header @reset-event="reset" />
    <div class="flex justify-center py-10">
      <ProgressTracker
        v-if="categoryState"
        :type_ai_systeem_state="categoryState.type_ai_systeem_state"
        :open_source_state="categoryState.open_source_state"
        :uitzonderingsgrond_state="categoryState.uitzonderingsgrond_state"
        :risicocategorie_state="categoryState.risicocategorie_state"
        :systeemrisico_state="categoryState.systeemrisico_state"
        :transparantie_risico_state="categoryState.transparantie_risico_state"
        :entiteit_rol_state="categoryState.entiteit_rol_state"
      />
      <div
        class="px-20"
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
        <div v-if="currentQuestion" class="ai-decisiontree-form-question">
          <Question
            :question="currentQuestion.question"
            :id="currentQuestion.questionId"
            :sources="currentQuestion.sources"
            :answers="currentQuestion.answers"
            :topic="currentCategory.topic"
            @answered="givenAnswer"
          />
        </div>
      </div>
      <div class="rvo-layout-margin-horizontal--2xl">
        <button
          @click="back"
          v-if="questionId !== '0'"
          type="button"
          class="utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
        >
          Vorige vraag
        </button>
      </div>
    </div>
  </div>
</template>
