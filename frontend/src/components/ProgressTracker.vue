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

/**
 * De status is visueel alleen aan kleur en pictogram te zien. Deze tekst maakt
 * dezelfde informatie beschikbaar voor screenreaders (WCAG 1.4.1 Use of Color).
 */
const stateLabels: Record<string, string> = {
  completed: 'afgerond',
  doing: 'huidige stap',
  incomplete: 'nog te doen'
}

const steps = computed(() =>
  props.categoryState.slice(0, stepLabels.length).map((progress, index) => ({
    ...progress,
    label: stepLabels[index],
    stateLabel: stateLabels[progress.state] ?? progress.state
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
  <!-- Een genummerde lijst: de stappen hebben een vaste volgorde, en een
       screenreader meldt zo hoeveel stappen er zijn en de hoeveelste dit is. -->
  <ol class="rvo-progress-tracker no-list" aria-label="Voortgang in de beslishulp">
    <li
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--start rvo-image-bg-progress-tracker-start-end-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before"
    ></li>
    <li
      v-for="step in steps"
      :key="step.category"
      :class="change_status(step.state)"
      :aria-current="step.state === 'doing' ? 'step' : undefined"
    >
      <!-- Geen <a>: dit verwijst nergens heen en was met het toetsenbord niet
           te bereiken, terwijl het wel als link werd aangekondigd. -->
      <span class="progress-tracker-font rvo-progress-tracker__step-link">
        {{ step.label }}
      </span>
      <span class="aiv-visually-hidden"> ({{ step.stateLabel }})</span>
    </li>
    <li
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--end rvo-image-bg-progress-tracker-start-end-md--after"
    >
      Vervolgstappen per risicogroep
    </li>
  </ol>
</template>
