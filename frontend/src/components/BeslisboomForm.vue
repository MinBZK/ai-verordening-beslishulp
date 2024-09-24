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
const { AcceptedDisclaimer, QuestionId, ConclusionId } = storeToRefs(questionStore)

const categoryStore = useCategoryStore()
const { categoryState, previousCategory } = storeToRefs(categoryStore)

const data_questions = ref<Questions>([])
const data_conclusions = ref<Conclusions>([])
const data_categories = ref<Categories>([])
const questionId = QuestionId
let conclusionId = ConclusionId
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

function handleVersions(question_or_conclusion_id: string){
  let category: Category | undefined
  let versions = question_or_conclusion_id.split(".")
  category = data_categories.value.find((q) => q.questionId === versions[0])
  if (versions.length >= 2) {
    // Only overwrite if we find something here
    let category_overwrite = data_categories.value.find((q) => q.questionId === versions[0] + '.' + versions[1])
    if(category_overwrite != undefined){
      category = category_overwrite
    }
  }
  if (versions.length >= 3 ){
    let category_overwrite = data_categories.value.find((q) => q.questionId === versions[0] + '.' + versions[1] + "." + versions[2])
    if(category_overwrite != undefined){
      category = category_overwrite
    }
  }
  return category
}

const currentCategory = computed(() => {
  if (questionId.value){
    return handleVersions(questionId.value)
  } else {
    questionStore.updateLabelsAtConclusion()
    return handleVersions(conclusionId.value)
  }
})

const currentQuestion = computed(() => {
  return data_questions.value.find((q) => q.questionId === questionId.value)
})

const findConclusion = computed(() => {
  return data_conclusions.value.find((q) => q.conclusionId === conclusionId.value)
})

function handleNextStep(object: Answer | Redirect) {
  questionStore.setQuestionId(object.nextQuestionId ?? null)
  if (object.nextConclusionId) {
    questionStore.setConclusionId(String(object.nextConclusionId))
  }
  categoryStore.updateCurrentCategory(currentCategory.value?.topic)
}

async function givenAnswer(answer: Answer) {
  questionStore.addAnswer(questionId.value)
  if (answer.labels) {
    for (let i in answer.labels) {
      questionStore.addLabel(answer.labels[i], questionId.value)
      questionStore.addLabelByCategory(answer.labels[i], currentCategory.value?.topic)
    }
  }
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
  } else {
    handleNextStep(answer)
  }
}

function reset() {
  questionStore.reset()
  categoryStore.reset()
}

function back() {
  questionStore.revertAnswer(previousCategory.value)
  categoryStore.revertCurrentCategory()
}

function acceptDisclaimer() {
  questionStore.acceptDisclaimer()
}

</script>

<template>
  <div v-if="AcceptedDisclaimer == '0'">
    <HomePage @accept-disclaimer="acceptDisclaimer" />
  </div>
  <div v-else>
    <Header @reset-event="reset" />
    <div class="rvo-max-width-layout rvo-max-width-layout--md flex justify-center px-10 py-10">
      <ProgressTracker
        v-if="categoryState"
        :soort_toepassing_state="categoryState.soort_toepassing_state"
        :open_source_state="categoryState.open_source_state"
        :publicatiecategorie_state="categoryState.publicatiecategorie_state"
        :systeemrisico_state="categoryState.systeemrisico_state"
        :transparantieverplichtingen_state="categoryState.transparantieverplichtingen_state"
        :rol_state="categoryState.rol_state"
      />
      <div class="px-20">
        <DefaultLoader :loading="isLoading" />
        <DefaultError :error="error" />
        <Conclusion
          v-if="findConclusion && questionStore.getLabelsByCategory()"
          :conclusion="findConclusion.conclusion"
          :obligation="findConclusion.obligation"
          :sources="findConclusion.sources"
          :topic="currentCategory?.topic"
          :labels="questionStore.getLabelsByCategory()"
        />
        <div v-if="currentQuestion && currentCategory">
          <Question
            :question="currentQuestion.question"
            :id="currentQuestion.questionId"
            :sources="currentQuestion.sources"
            :answers="currentQuestion.answers"
            :topic="currentCategory.topic"
            :labels="questionStore.getLabelsByCategory()"
            @answered="givenAnswer"
            @back="back"
          />
        </div>
      </div>
    </div>
  </div>
</template>
