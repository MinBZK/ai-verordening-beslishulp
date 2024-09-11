<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'

interface Props {
  question_id: id
  topic: string
  'labels': { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()
const emit = defineEmits(['back', 'next-topic'])

function get_background_color(label: string | undefined) {
  if (label === 'Nader te bepalen') {
    return 'background-color: var(--rvo-color-grijs-300)'
  }
  return 'background-color: var(--rvo-color-hemelblauw-450)'
}

</script>

<template>
  <div class="flex-col">
    <h3 class="utrecht-heading-3" style="color: var(--rvo-color-hemelblauw)">Sub-resultaat</h3>
    <div class="flex">
      <h1 class="utrecht-heading-1"><span>{{ topic }}</span></h1>
      <BetaversionLabel />
    </div>
    <div class="rvo-table--responsive">
      <table class="rvo-table">
        <thead class="rvo-table-head">
        <tr class="rvo-table-row">
          <th scope="col" class="rvo-table-header">Categorie</th>
          <th
            scope="col"
            class="rvo-table-header rvo-table-header"
          >
            Labels
          </th>
        </tr>
        </thead>
        <tbody class="rvo-table-body">
        <tr v-for='(assigned_labels, category) in labels' :key="category" class="rvo-table-row">
          <td class="rvo-table-cell rvo-text--bold rvo-text--md">{{ category }}</td>
          <td class="rvo-table-cell">
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
  <div>
    <button
      @click="$emit('back')"
      v-if="question_id !== '0'"
      type="button"
      class="utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline "
    >
      Vorige vraag
    </button>
    <!--          Volgende vraag if sub result overview active-->
  </div>
</template>
