<script setup lang="ts">
import Sources from '@/components/Sources.vue'
import { Answer } from '@/models/DecisionTree'
import SubResult from '@/components/SubResult.vue'
import HelpWanted from '@/components/HelpWanted.vue'

interface Props {
  id: string
  question: string
  explanation: string
  sources: { source: string; url: string | undefined; }[] | undefined
  answers: Array<Answer>
  category: string
  labels: { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()
defineEmits(['answered', 'back'])
</script>

<template>
  <div class="rvo-max-width-layout--md">
    <!-- Question and Answer section -->
    <div class="rvo-layout-margin-vertical--s">
    <fieldset class="rvo-max-width-layout--sm utrecht-form-fieldset rvo-form-fieldset"
    style="width: 600px">
      <!-- Question section -->
      <div class="flex">
      <h1 class="utrecht-heading-3"><span v-html="question" ></span></h1>
      </div>
      <div>
      <p style="white-space: pre-line" class="utrecht-paragraph">
          <span ></span>
          <slot />
        </p>
      </div>
      <!-- Explanation section -->
      <div>
        <p style="white-space: pre-line" class="utrecht-paragraph">
          <span v-html="explanation"></span>
          <slot />
        </p>
        <HelpWanted style="margin-top: -2%; margin-bottom: 5%"/>
      </div>
      <div>
        <!-- Controleer of er meer dan 2 antwoorden zijn -->
        <div v-if="answers.length > 2">
          <ul class="rvo-layout-column rvo-layout-gap--sm">
          <li v-for="(answer, index) in answers" :key="index">
            <button
              :key="id + index.toString()"
              aria-roledescription="button"
              @click="$emit('answered', answer)"
              :value="id + index.toString()"
              :id="index.toString()"
              class="utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md rvo-link--no-underline rvo-link--hover"
            >
              {{ answer.answer }}
            </button>
          </li>
        </ul>
        </div>

        <!-- Als er 2 of minder antwoorden zijn, toon ze als losse knoppen -->
        <div class= "rvo-layout-row rvo-layout-gap--sm" v-else>
          <div v-for="(answer, index) in answers" :key="index">
            <button
              :key="id + index.toString()"
              aria-roledescription="button"
              @click="$emit('answered', answer)"
              :value="id + index.toString()"
              :id="index.toString()"
              class="utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md rvo-link--no-underline rvo-link--hover"
            >
              {{ answer.answer }}
            </button>
          </div>
        </div>
      </div>

    </fieldset>
    <div class="rvo-layout-margin-vertical--xl">
      <button
        @click="$emit('back')"
        v-if="id !== '1.2'"
        type="button"
        class="flex utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline "
      >
        <span
                  class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
                  role="img"
                  aria-label="Terug"
                ></span>
        Vorige vraag
      </button>
    </div>
    <div class="rvo-layout-margin-vertical--xl">
      <Sources :sources="sources" />
    </div>

    <SubResult class="rvo-layout-margin-vertical--2xl"
      :category="category"
      :labels="labels"
      title="Tussenresultaten"
      conclusion=""/>
      </div>
  </div>
</template>
