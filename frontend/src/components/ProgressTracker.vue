<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryProgress } from '@/models/Categories'

interface Props {
  categoryState: CategoryProgress[]
}

const props = defineProps<Props>()

/**
 * The label shown per category, in the order the categories are defined in categories.yaml.
 * Categories without a label (the conclusion) are not shown as a separate step, the end of the
 * tracker covers those.
 */
const stepLabels = [
  'Geldt de AI-verorderning voor mij?',
  'Zo ja, in welke risicogroep valt de toepassing?'
]

const steps = computed(() =>
  props.categoryState.slice(0, stepLabels.length).map((progress, index) => ({
    ...progress,
    label: stepLabels[index]
  }))
)

function change_status(state: string) {
  return (
    'rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-image-bg-progress-tracker-' +
    state +
    '-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before rvo-progress-tracker__step--' +
    state
  )
}
</script>

<template>
  <div class="rvo-progress-tracker">
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--start rvo-image-bg-progress-tracker-start-end-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before"
    ></div>
    <div v-for="step in steps" :key="step.category" :class="change_status(step.state)">
      <a class="progress-tracker-font rvo-progress-tracker__step-link">
        {{ step.label }}
      </a>
    </div>
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--end rvo-image-bg-progress-tracker-start-end-md--after"
    >
      Vervolgstappen per risicogroep
    </div>
  </div>
</template>
