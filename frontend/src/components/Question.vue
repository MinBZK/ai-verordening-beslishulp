<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'
import Sources from '@/components/Sources.vue'
import { Answer } from '@/models/DecisionTree'
import SubResult from '@/components/SubResult.vue'

interface Props {
  id: string
  question: string
  sources: { source: string; url: string | undefined; }[] | undefined
  answers: Array<Answer>
  topic: string
  labels: { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()
defineEmits(['answered', 'back'])
</script>

<template>
  <div class="rvo-max-width-layout--md">
    <div class="flex">
      <h1 class="utrecht-heading-1"><span>{{ topic }}</span></h1>
      <BetaversionLabel />
    </div>
    <Sources :sources="sources" />
    <!-- Question and Answer section -->
    <div class="rvo-layout-margin-vertical--2xl">
    <fieldset class="rvo-max-width-layout--sm utrecht-form-fieldset rvo-form-fieldset"
    style="width: 600px">
      <!-- Question section -->
      <div>
        <p style="white-space: pre-line" class="utrecht-paragraph">
          <span v-html="question"></span>
          <slot />
        </p>
      </div>

      <!-- Answers section -->
      <div class="flex items-center gap-x-3">
        <div v-for="(answer, index) in answers" :key="index">
          <button
            :key="id + index.toString()"
            aria-roledescription="button"
            @click="$emit('answered', answer)"
            :value="id + index.toString()"
            :id="index.toString()"
            class="utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md rvo-link--no-underline rvo-link--hover"
            :for="index.toString()"
          >
            {{ answer.answer }}
          </button>
        </div>
      </div>
    </fieldset>

    <div class="rvo-layout-margin-vertical--xl">
      <button
        @click="$emit('back')"
        v-if="id !== '0'"
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
      </div>

    <SubResult class="rvo-layout-margin-vertical--2xl"
      style="width: 500px"
      :topic="topic"
      :labels="labels"
      title="Tussenresultaten"
      conclusion=""/>


  </div>

</template>
