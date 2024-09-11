<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'
import Sources from '@/components/Sources.vue'
import { Answer } from '@/models/DecisionTree'

interface Props {
  id: string
  question: string
  sources: { source: string; url: string | undefined; }[] | undefined
  answers: Array<Answer>
  topic: string
}

defineProps<Props>()
defineEmits(['answered'])
</script>

<template>
  <div class="flex-col">
    <div class="flex">
      <h1 class="utrecht-heading-1"><span>{{ topic }}</span></h1>
        <BetaversionLabel />
    </div>
    <Sources :sources="sources" />
    <!-- Question and Answer section -->
    <fieldset class="rvo-layout-margin-vertical--2xl utrecht-form-fieldset rvo-form-fieldset">
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
            {{answer.answer}}
          </button>
        </div>
      </div>
    </fieldset>
  </div>
</template>
