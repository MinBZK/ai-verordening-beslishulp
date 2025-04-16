<script setup lang="ts">
import { ref } from 'vue'

interface ExportFormData {
  algorithmName: string
  description: string
  filledBy: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'export'])

const formData = ref<ExportFormData>({
  algorithmName: '',
  description: '',
  filledBy: ''
})

const handleExport = () => {
  emit('export', formData.value)
  emit('close')
}

const handleCancel = () => {
  emit('close')
}

const handleBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <div v-show="isOpen" id="modal" class="minbzk-modal">
    <div class="modal-underlay" @click="handleBackdropClick"></div>
    <div class="modal-content-container">
      <div class="modal-content-close" @click="handleCancel">&#xd7;</div>
      <div class="modal-content">
        <h3 class="utrecht-heading-3">
          Exporteer AI-verordening profiel naar PDF
        </h3>
        <div class="rvo-layout-margin-vertical--md">
          <p class="rvo-text--md --rvo-font-sans-serif-font-family">
            Het document bevat:
            <ul class="rvo-default-list">
              <li>Het AI-verordening profiel</li>
              <li>De verplichtingen die gelden inclusief bronnen</li>
              <li>De keuzes die zijn gemaakt in de beslishulp (inclusief eventuele toelichting)</li>
            </ul>
            Daarnaast kun je nog extra informatie toevoegen:
          </p>
        </div>

        <form @submit.prevent="handleExport">
          <div class="rvo-layout-margin-vertical--md">
            <label for="algorithmName" class="rvo-label">Naam algoritme</label> (niet verplicht)
            <input
              id="algorithmName"
              v-model="formData.algorithmName"
              type="text"
              class="utrecht-textbox utrecht-textbox--rvo-sm"
            >
          </div>

          <div class="rvo-layout-margin-vertical--md">
            <label for="description" class="rvo-label">Omschrijving</label> (niet verplicht)
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              class="utrecht-textarea utrecht-textarea--rvo-sm"
            ></textarea>
          </div>

          <div class="rvo-layout-margin-vertical--md">
            <label for="filledBy" class="rvo-label">Ingevuld door</label> (niet verplicht)
            <input
              id="filledBy"
              v-model="formData.filledBy"
              type="text"
              class="utrecht-textbox utrecht-textbox--rvo-sm"
            >
          </div>

          <div class="rvo-layout-row rvo-layout-gap--md rvo-layout-justify--end rvo-layout-margin-vertical--md">
            <button
              type="button"
              @click="handleCancel"
              class="utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md"
            >
              Annuleren
            </button>
            <button
              type="submit"
              class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md"
            >
              Exporteren
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
