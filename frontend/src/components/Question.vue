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
      <div class="mt-6 space-y-6">
        <div v-for="(answer, index) in answers" :key="index" class="flex items-center gap-x-3">
          <input
            :key="id + index.toString()"
            aria-roledescription="radio button"
            @click="$emit('answered', answer)"
            :value="id + index.toString()"
            :id="index.toString()"
            type="radio"
            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label :for="index.toString()" class="block text-sm font-medium leading-6 text-gray-900">{{
              answer.answer
            }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>
