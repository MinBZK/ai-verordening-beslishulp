<script setup lang="ts">
import BetaversionLabel from '@/components/betaversion-label.vue'

interface Props {
  topic: string | null
  'labels': { category: string; assigned_labels: string | undefined; }[] | undefined
  showButtons: boolean | null
}

defineProps<Props>()
const emit = defineEmits(['back', 'forward'])

function get_background_color(label: string | undefined) {
  if (label === 'Nader te bepalen') {
    return 'background-color: var(--rvo-color-grijs-300)'
  }
  return 'background-color: var(--rvo-color-hemelblauw-450)'
}

</script>

<template>
  <div class="flex-col">
    <h3 v-if="showButtons" class="utrecht-heading-3" style="color: var(--rvo-color-hemelblauw)">Sub-resultaat</h3>
    <div v-if="showButtons" class="flex">
      <h1 class="utrecht-heading-1"><span>{{ topic }}</span></h1>
      <BetaversionLabel />
    </div>
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
  <div v-if="showButtons" class="py-5">
    <button
      @click="$emit('back')"
      type="button"
      class="flex inline-block utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline "
    >
      Vorige
    </button>
    <button
      @click="$emit('forward')"
      type="button"
      class="flex float-right utrecht-button utrecht-button--primary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline px-50"
    >
      Volgende
    </button>
  </div>
</template>
