<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'
import { computed } from 'vue'

interface Props {
  category: string | undefined
  labels: { category: string; assigned_labels: string | undefined; }[] | undefined
  title: string
  conclusion: string
}

  const props = defineProps<Props>()


// Function to check if there are any valid labels in a category
function hasValidLabelsForCategory(assigned_labels: string[]) {
  return assigned_labels.some(label => label !== 'nader te bepalen' && label !== 'niet van toepassing')
}

// Filter categories that have valid labels (not 'nader te bepalen' or 'niet van toepassing')
const filteredCategories = computed(() => {
  if (!props.labels) return []

  return Object.entries(props.labels).filter(([category, assigned_labels]) =>
    hasValidLabelsForCategory(assigned_labels)
  )
})

// Check if there are any valid labels to display the "Tussenresultaat" section
const showTussenresultaat = computed(() => filteredCategories.value.length > 0)

// Function to set the background color of the labels
function get_background_color(label: string | undefined) {
  if (label === 'nader te bepalen' || label === 'niet van toepassing') {
    return 'background-color: var(--rvo-color-grijs-300)'
  }
  return 'background-color: var(--rvo-color-hemelblauw-450)'
}

</script>

<template>
  <div v-if="showTussenresultaat">
    <div class="rvo-accordion">
      <details class="rvo-accordion__item">
        <summary class="rvo-accordion__item-summary">
          <h3 class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed items-center">
            <span class="utrecht-icon rvo-icon rvo-icon-delta-omlaag rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--closed" role="img" aria-label="Delta omlaag"></span>
            <span class="utrecht-icon rvo-icon rvo-icon-delta-omhoog rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--open" role="img" aria-label="Delta omhoog"></span>
            {{ title }}
          </h3>
          <span class="rvo-accordion-teaser">Bekijk hier je profiel tot nu toe</span>
        </summary>
        <div class="rvo-accordion__content">
          <div class="rvo-table--responsive py-5">
            <table class="rvo-table">
              <thead class="rvo-table-head">
                <tr class="rvo-table-row">
                  <th scope="col" class="rvo-table-header">Categorie</th>
                  <th scope="col" class="rvo-table-header">Resultaat</th>
                </tr>
              </thead>
              <tbody class="rvo-table-body">
                <!-- Display only categories with valid labels -->
                <tr v-for="([category, assigned_labels]) in filteredCategories" :key="category" class="rvo-table-row">
                  <td class="rvo-table-cell rvo-text--bold rvo-text--md">{{ category }}</td>
                  <td class="flex rvo-table-cell gap-x-3">
                    <div v-for="label in assigned_labels" :key="label" class="rvo-tag rvo-tag--default" :style="get_background_color(label)">
                      {{ label }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  </div>

  <div v-else>
    <!-- If no labels, show nothing -->
  </div>
</template>
