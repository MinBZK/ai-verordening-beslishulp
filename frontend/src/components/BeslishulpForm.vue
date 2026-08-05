<script setup lang="ts">
import jexl from 'jexl'
import { computed, nextTick, onMounted, ref } from 'vue'
import {
  Answer,
  Conclusions,
  DecisionTree,
  Questions,
  Redirect,
  UserDecision
} from '@/models/DecisionTree'
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
import { UserDecisionsService } from '@/services/userDecisionsService.ts'

const questionStore = useQuestionStore()
const { AcceptedDisclaimer, QuestionId, ConclusionId } = storeToRefs(questionStore)

const categoryStore = useCategoryStore()
const { categoryState, previousSubCategory } = storeToRefs(categoryStore)

const data_questions = ref<Questions>([])
const data_conclusions = ref<Conclusions>([])
const data_categories = ref<Categories>([])
const questionId = QuestionId
const conclusionId = ConclusionId
const isLoading = ref(true)
const error = ref<string | null>(null)

/**
 * A7: zonder statusbericht verschijnt de volgende vraag geruisloos. De live-regio meldt de
 * stap, niet de vraagtekst zelf — die wordt al voorgelezen doordat de focus naar de nieuwe
 * <h1> gaat (zie Question.vue). Anders zou alles dubbel worden aangekondigd.
 */
const announcement = ref('')

const userDecisions = UserDecisionsService()

onMounted(async () => {
  // Read in the Data
  try {
    // Read in the decision tree json
    const validationResultDecisionTree: t.Validation<any> = DecisionTree.decode(decision_tree_json)
    fold(
      (errors: t.Errors) => {
        console.log('Validation errors: ' + errors.length)
        const error_locations = []
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
        const error_locations = []
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

function handleVersions(question_or_conclusion_id: string) {
  let category: Category | undefined
  const versions = question_or_conclusion_id.split('.')
  category = data_categories.value.find((q) => q.questionId === versions[0])
  if (versions.length >= 2) {
    // Only overwrite if we find something here
    const category_overwrite = data_categories.value.find(
      (q) => q.questionId === versions[0] + '.' + versions[1]
    )
    if (category_overwrite != undefined) {
      category = category_overwrite
    }
  }
  if (versions.length >= 3) {
    const category_overwrite = data_categories.value.find(
      (q) => q.questionId === versions[0] + '.' + versions[1] + '.' + versions[2]
    )
    if (category_overwrite != undefined) {
      category = category_overwrite
    }
  }
  return category
}

const currentCategory = computed(() => {
  if (questionId.value) {
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
  categoryStore.updateCurrentCategory(
    currentCategory.value?.category,
    currentCategory.value?.subcategory
  )
  // Wachten op de DOM-update in plaats van op een timer van 200ms: die gok scrollde de
  // gebruiker weg op een willekeurig moment na de vraagovergang.
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    announcement.value = findConclusion.value
      ? 'Resultaat geladen.'
      : `Volgende vraag geladen: ${currentCategory.value?.subcategory ?? currentCategory.value?.category ?? ''}`
  })
}

async function givenAnswer(answer: Answer) {
  const decision: t.TypeOf<typeof UserDecision> = {
    questionId: questionId.value,
    question: currentQuestion.value?.question,
    answer: answer.answer,
    explanation: answer.explanation
  }
  userDecisions.updatePreviousUserDecision(decision)
  questionStore.addUserDecisionPath(decision)
  questionStore.addAnswer(questionId.value)
  if (answer.labels) {
    for (const label of answer.labels) {
      if (questionId.value) {
        questionStore.addLabel(label, questionId.value as string)
      }
      if (currentCategory.value?.subcategory) {
        questionStore.addLabelBySubCategory(label, currentCategory.value.subcategory)
      }
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
  userDecisions.reset()
}

function back() {
  categoryStore.revertCurrentCategory()
  questionStore.revertAnswer(previousSubCategory.value)
}

function backButtonConclusion() {
  conclusionId.value = ''
  back()
  questionStore.revertLabelsAtConclusion()
}

function acceptDisclaimer() {
  questionStore.acceptDisclaimer()
}
</script>

<template>
  <div v-if="AcceptedDisclaimer == '0'">
    <HomePage @accept-disclaimer="acceptDisclaimer" />
  </div>
  <div v-else class="rvo-layout-column rvo-layout-gap--2xl">
    <!-- Skip-link: eerste focusbare element, zodat toetsenbordgebruikers de navigatie kunnen overslaan -->
    <a class="aiv-skip-link rvo-link" href="#beslishulp-inhoud">Ga direct naar de inhoud</a>
    <!--
      Statusberichten (WCAG 4.1.3). De regio staat er altijd, ook leeg: een aria-live-regio die
      pas samen met zijn tekst in de DOM verschijnt, wordt door schermlezers niet aangekondigd.
    -->
    <div
      id="beslishulp-statusbericht"
      class="aiv-visually-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ announcement }}
    </div>
    <Header
      :question-id="currentQuestion?.questionId"
      :disclaimer-screen="AcceptedDisclaimer"
      @reset-event="reset"
    />
    <div
      id="progress-question-mobile"
      class="rvo-layout-column rvo-max-width-layout rvo-layout-align-items-start rvo-max-width-layout-inline-padding--sm"
    >
      <ProgressTracker v-if="!findConclusion" :category-state="categoryState" />
      <!--
        Zonder <main> heeft juist het scherm waar de gebruiker de meeste tijd doorbrengt geen
        hoofdlandmark; <main> stond alleen op de HomePage (WCAG 1.3.1 / 2.4.1).
      -->
      <main id="beslishulp-inhoud" class="rvo-layout-gap--md" tabindex="-1">
        <DefaultLoader :loading="isLoading" />
        <DefaultError :error="error" />
        <Conclusion
          v-if="findConclusion && questionStore.getLabelsBySubCategory()"
          :conclusion="findConclusion.conclusion"
          :obligation="findConclusion.obligation"
          :sources="findConclusion.sources"
          :category="currentCategory?.category"
          :labels="questionStore.getLabelsBySubCategory()"
          @back="backButtonConclusion"
        />
        <Question
          v-if="currentQuestion && currentCategory"
          :id="currentQuestion.questionId"
          :question="currentQuestion.question"
          :explanation="currentQuestion.explanation"
          :sources="currentQuestion.sources"
          :answers="currentQuestion.answers"
          :question_category="currentQuestion.category"
          :category="currentCategory.category"
          :labels="questionStore.getLabelsBySubCategory()"
          :user-decisions="userDecisions"
          @answered="givenAnswer"
          @back="back"
        />
      </main>
    </div>
  </div>
</template>
