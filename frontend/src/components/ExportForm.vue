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
        <!-- Form = alles binnen modal -->
        <form @submit.prevent="handleExport" class="flex flex-col h-full">

          <!-- Scrollbare body -->
          <div class="modal-body flex-grow overflow-auto space-y-4">
            <h3 class="utrecht-heading-3">Exporteer AI-verordening profiel naar PDF</h3>

            <div class="rvo-layout-margin-vertical--md">
              <p class="rvo-text--md --rvo-font-sans-serif-font-family">
                Het document bevat:
              </p>
              <ul class="rvo-default-list">
                <li>Het AI-verordening profiel</li>
                <li>De geldende verplichtingen met bijbehorende bronnen</li>
                <li>De gemaakte keuzes in de beslishulp (inclusief eventuele toelichtingen)</li>
              </ul>
              <p class="rvo-text--md --rvo-font-sans-serif-font-family">
                Je kunt hieronder <b><i>optioneel</i></b> extra informatie toevoegen:
              </p>
            </div>

            <div>
              <label for="algorithmName" class="rvo-label">Naam algoritme</label>
              <input
                id="algorithmName"
                v-model="formData.algorithmName"
                type="text"
                class="utrecht-textbox utrecht-textbox--rvo-sm w-full"
              >
            </div>

            <div>
              <label for="description" class="rvo-label">Omschrijving</label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="3"
                class="utrecht-textarea utrecht-textarea--rvo-sm w-full"
              ></textarea>
            </div>

            <div>
              <label for="filledBy" class="rvo-label">Ingevuld door</label>
              <input
                id="filledBy"
                v-model="formData.filledBy"
                type="text"
                class="utrecht-textbox utrecht-textbox--rvo-sm w-full"
              >
            </div>
          </div>

          <!-- Buttons onderin -->
          <div class="modal-buttons flex justify-end gap-4 pt-4 bg-white">
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
