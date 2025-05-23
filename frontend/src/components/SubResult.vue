<script setup lang="ts">
import { computed, getCurrentInstance, inject } from 'vue'
import { filterLabels } from '@/services/labelsService.ts'

interface Props {
  category: string | undefined
  labels: { category: string; assigned_labels: string | undefined }[] | undefined
  title: string
  conclusion: string | null
}

type FilteredLabels = { [category: string]: string[] }

const props = defineProps<Props>()

// Access openExportDialog function from parent component
const openExportDialog = inject('openExportDialog', () => {
  console.warn('openExportDialog function not provided')
})

const filteredLabels = computed<FilteredLabels>(() => filterLabels(props.labels))

const hasLabels = computed(() => {
  return Object.keys(filteredLabels.value).length > 0
})
</script>

<template>
  <div v-if="hasLabels">
    <div v-if="conclusion == ''">
      <div class="rvo-accordion">
        <details class="rvo-accordion__item">
          <summary class="rvo-accordion__item-summary">
            <h3
              class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed items-center"
            >
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omlaag rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--closed"
                role="img"
                aria-label="Delta omlaag"
              ></span>
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omhoog rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--open"
                role="img"
                aria-label="Delta omhoog"
              ></span>
              {{ title }}
            </h3>
            <span class="rvo-accordion-teaser"
              >Bekijk hier je AI-verordening profiel tot nu toe</span
            >
          </summary>
          <div class="rvo-accordion__content">
            <div class="rvo-table--responsive py-5">
              <table class="rvo-table">
                <thead class="rvo-table-head">
                  <tr class="rvo-table-row">
                    <th scope="col" class="rvo-table-header">Categorie</th>
                    <th scope="col" class="rvo-table-header rvo-table-header">Resultaat</th>
                  </tr>
                </thead>
                <tbody class="rvo-table-body">
                  <tr
                    v-for="(assigned_labels, category) in filteredLabels"
                    :key="category"
                    class="rvo-table-row"
                  >
                    <td class="rvo-table-cell rvo-text--bold rvo-text--md">{{ category }}</td>
                    <td class="flex rvo-table-cell gap-x-3">
                      <div
                        v-for="label in assigned_labels"
                        :key="label"
                        class="rvo-tag rvo-tag--default"
                        :style="{ backgroundColor: 'var(--rvo-color-hemelblauw-450)' }"
                      >
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
      <div class="rvo-accordion">
        <details class="rvo-accordion__item" open="true">
          <summary class="rvo-accordion__item-summary">
            <h3
              class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed items-center"
            >
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omlaag rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--closed"
                role="img"
                aria-label="Delta omlaag"
              ></span>
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omhoog rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--open"
                role="img"
                aria-label="Delta omhoog"
              ></span>
              {{ title }}
            </h3>
            <span class="rvo-accordion-teaser"
              >Bekijk hier het AI-verordening profiel dat voor jou van toepassing is</span
            >
          </summary>
          <div class="rvo-accordion__content">
            <div class="rvo-table--responsive py-5">
              <table class="rvo-table">
                <thead class="rvo-table-head">
                  <tr class="rvo-table-row">
                    <th scope="col" class="rvo-table-header">Categorie</th>
                    <th scope="col" class="rvo-table-header rvo-table-header">Resultaat</th>
                  </tr>
                </thead>
                <tbody class="rvo-table-body">
                  <tr
                    v-for="(assigned_labels, category) in filteredLabels"
                    :key="category"
                    class="rvo-table-row"
                  >
                    <td class="rvo-table-cell rvo-text--bold rvo-text--md">{{ category }}</td>
                    <td class="flex rvo-table-cell gap-x-3">
                      <div
                        v-for="label in assigned_labels"
                        :key="label"
                        class="rvo-tag rvo-tag--default"
                        :style="{ backgroundColor: 'var(--rvo-color-hemelblauw-450)' }"
                      >
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
  </div>
</template>
