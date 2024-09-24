<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'

interface Props {
  topic: string | null
  labels: { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()

function get_background_color(label: string | undefined) {
  if (label === 'Nader te bepalen' || label === 'Niet van toepassing') {
    return 'background-color: var(--rvo-color-grijs-300)'
  }
  return 'background-color: var(--rvo-color-hemelblauw-450)'
}

</script>

<template>

  <div class="rvo-accordion">
    <details class="rvo-accordion__item">
      <summary class="rvo-accordion__item-summary">
        <h3
          class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed"
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
          tussenresultaten
        </h3>
      </summary>
      <div class="rvo-accordion__content">
        <div class="rvo-table--responsive py-5">
          <table class="rvo-table">
            <thead class="rvo-table-head">
            <tr class="rvo-table-row">
              <th scope="col" class="rvo-table-header">Categorie</th>
              <th
                scope="col"
                class="rvo-table-header rvo-table-header"
              >
                Resultaat
              </th>
            </tr>
            </thead>
            <tbody class="rvo-table-body">
            <tr v-for='(assigned_labels, category) in labels' :key="category" class="rvo-table-row">
              <td class="rvo-table-cell rvo-text--bold rvo-text--md">{{ category }}</td>
              <td class="flex rvo-table-cell gap-x-3">
                <div v-for='(label) in assigned_labels' :key="label"
                     class="rvo-tag rvo-tag--default" :style="get_background_color(label)">
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
</template>
