<script setup lang="ts">
import Sources from '@/components/Sources.vue'
import { Answer, type UserDecision } from '@/models/DecisionTree'
import SubResult from '@/components/SubResult.vue'
import HelpWanted from '@/components/HelpWanted.vue'
import { getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import * as t from 'io-ts'
import type { UserDecisionsServiceType } from '@/services/userDecisionsService.ts'

interface Props {
  id: string
  question: string
  explanation: string
  sources: { source: string; url: string | undefined }[] | undefined
  answers: Array<Answer>
  category: string
  question_category: string
  labels: { category: string; assigned_labels: string | undefined }[] | undefined
  userDecisions: UserDecisionsServiceType
}

const props = defineProps<Props>()
defineEmits(['answered', 'back'])

const selectedAnswer = ref<Answer | null>(null)
const userExplanation = ref('')
const explanationFieldRef = ref<HTMLTextAreaElement | null>(null)
const showExplanationField =
  getCurrentInstance()!.appContext.config.globalProperties.showExplanationField

function updateFromPreviousDecision() {
  const previousUserDecision = props.userDecisions.getPreviousUserDecision(props.id)
  if (previousUserDecision && props.answers.length > 1) {
    const matchingAnswer = props.answers.find(
      (answer) => answer.answer == previousUserDecision.answer
    )
    if (matchingAnswer) {
      selectedAnswer.value = matchingAnswer
    }
    if (previousUserDecision.explanation) {
      userExplanation.value = previousUserDecision.explanation
    } else {
      userExplanation.value = ''
    }
  } else {
    selectedAnswer.value = null
    userExplanation.value = ''
  }
  nextTick(() => {
    adjustHeight()
  })
}

watch(() => props.id, updateFromPreviousDecision)
onMounted(updateFromPreviousDecision)

function adjustHeight() {
  const textarea: HTMLTextAreaElement | null = explanationFieldRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

function selectAnswer(answer: Answer) {
  selectedAnswer.value = answer
  if (explanationFieldRef.value) {
    explanationFieldRef.value.focus()
  }
}

function submitAnswer() {
  if (selectedAnswer.value) {
    selectedAnswer.value.explanation = userExplanation.value
  }
  return selectedAnswer.value
}

function optionalSaveUserDecision() {
  if (selectedAnswer.value || userExplanation.value) {
    const decision: t.TypeOf<typeof UserDecision> = {
      questionId: props.id,
      question: props.question,
      answer: selectedAnswer.value?.answer,
      explanation: userExplanation.value
    }
    props.userDecisions.updatePreviousUserDecision(decision)
  }
}
</script>

<template>
  <div class="rvo-max-width-layout--md">
    <!-- Question and Answer section -->
    <div class="rvo-layout-margin-vertical--s">
      <fieldset class="rvo-max-width-layout--sm utrecht-form-fieldset rvo-form-fieldset border-none"
                style="width: 600px;">
        <!-- Question section -->
        <div class="flex">
          <h1 class="utrecht-heading-3"><span v-html="question"></span></h1>
        </div>
        <div>
          <p style="white-space: pre-line" class="utrecht-paragraph">
            <span></span>
            <slot />
          </p>
        </div>
        <!-- Explanation section -->
        <div>
          <p style="white-space: pre-line" class="utrecht-paragraph">
            <span v-html="explanation"></span>
            <slot />
          </p>
          <HelpWanted style="margin-top: -2%; margin-bottom: 5%" />
        </div>
        <div>
          <!-- Controleer of er meer dan 2 antwoorden zijn -->
          <div v-if="answers.length > 2">
            <ul class="rvo-layout-column rvo-layout-gap--sm no-list">
              <li v-for="(answer, index) in answers" :key="index">
                <button
                  :key="id + index.toString()"
                  aria-roledescription="button"
                  @click="
                    () => {
                      selectAnswer(answer)
                      if (!showExplanationField) {
                        $emit('answered', submitAnswer())
                      }
                    }
                  "
                  :id="index.toString()"
                  :class="[
                    'utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md rvo-link--no-underline rvo-link--hover',
                    {
                      'utrecht-button--active':
                        selectedAnswer && selectedAnswer.answer === answer.answer
                    }
                  ]"
                >
                  {{ answer.answer }}
                </button>
              </li>
            </ul>
          </div>
          <!-- Als er 2 of minder antwoorden zijn, toon ze als losse knoppen -->
          <div class="rvo-layout-row rvo-layout-gap--sm" v-else>
            <div v-for="(answer, index) in answers" :key="index">
              <button
                :key="id + index.toString()"
                aria-roledescription="button"
                @click="
                  () => {
                    selectAnswer(answer)
                    const shouldSubmit = !showExplanationField || answers.length === 1
                    if (shouldSubmit) {
                      $emit('answered', submitAnswer())
                    }
                  }
                "
                :id="index.toString()"
                :class="[
                  'utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md rvo-link--no-underline rvo-link--hover',
                  {
                    'utrecht-button--active':
                      selectedAnswer && selectedAnswer.answer === answer.answer
                  }
                ]"
              >
                {{ answer.answer }}
              </button>
            </div>
          </div>
        </div>

        <!-- TODO: maybe we need a better check to determine if we want to show the explanation field for specific questions -->
        <div
          class="rvo-layout-margin-vertical--md"
          v-if="showExplanationField && question_category != 'tussenscherm'"
        >
          <label for="explanation-field" class="utrecht-form-label"
            ><span class="rvo-text--bold">Opmerking</span> (geen invloed op uitkomst, wel zichtbaar in rapport)</label
          >
          <textarea
            @input="adjustHeight"
            id="explanation-field"
            ref="explanationFieldRef"
            v-model="userExplanation"
            class="utrecht-textarea rvo-textarea"
            rows="1"
            style="width: 100%; min-height: 2.5em"
          >
          </textarea>
        </div>
      </fieldset>
      <div
        style="justify-content: flex-end"
        class="rvo-layout-margin-vertical--xl rvo-layout-row rvo-layout-align-items-end"
      >
        <button
          style="margin-right: auto"
          @click="optionalSaveUserDecision(); $emit('back')"
          v-if="id !== '1.1'"
          type="button"
          class="flex utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
        >
          <span
            class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
            role="img"
            aria-label="Terug"
          ></span>
          Vorige vraag
        </button>
        <button
          v-if="showExplanationField && answers.length > 1"
          @click="$emit('answered', submitAnswer())"
          type="button"
          :disabled="!selectedAnswer"
          class="flex utrecht-button utrecht-button--primary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
          :class="{ 'utrecht-button--disabled': !selectedAnswer }"
        >
          Volgende vraag
          <span
            class="utrecht-icon rvo-icon rvo-icon-pijl-naar-rechts rvo-icon--lg rvo-icon--wit"
            role="img"
            aria-label="Verder"
          ></span>
        </button>
      </div>
      <div class="rvo-layout-margin-vertical--xl">
        <Sources :sources="sources" />
      </div>

      <SubResult
        class="rvo-layout-margin-vertical--2xl"
        :category="category"
        :labels="labels"
        title="Tussenresultaten"
        conclusion=""
      />
    </div>
  </div>
</template>
