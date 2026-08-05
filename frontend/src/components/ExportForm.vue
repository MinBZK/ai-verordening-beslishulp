<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

// Escape sluit de dialoog. Op documentniveau in plaats van als @keydown op de wrapper: de
// focus staat bij het openen nog buiten de dialoog, en dan zou een handler op de wrapper
// de toetsaanslag nooit zien.
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => document.removeEventListener('keydown', handleEscape))
</script>

<template>
  <div
    v-show="isOpen"
    id="modal"
    class="minbzk-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="export-dialog-title"
  >
    <!--
      De underlay is een muis-gemak: klikken buiten de dialoog sluit hem. Voor toetsenbord- en
      hulpsoftware-gebruikers zijn "Annuleren", de sluitknop en Escape de route, dus de underlay
      is bewust uit de toegankelijkheidsboom gehaald in plaats van er een toetsafhandeling op te
      hangen die niets toevoegt.
    -->
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
    <div class="modal-underlay" aria-hidden="true" @click="handleBackdropClick"></div>
    <div class="modal-content-container">
      <button
        type="button"
        class="modal-content-close"
        aria-label="Sluit dit venster"
        @click="handleCancel"
      >
        &#xd7;
      </button>

      <div class="modal-content">
        <!-- Form = alles binnen modal -->
        <form class="flex flex-col h-full" @submit.prevent="handleExport">

          <!-- Scrollbare body -->
          <div class="modal-body flex-grow overflow-auto space-y-4">
            <h2 id="export-dialog-title" class="utrecht-heading-3">
              Exporteer AI-verordening profiel naar PDF
            </h2>

            <div class="rvo-layout-margin-vertical--md">
              <p class="rvo-text--md --rvo-font-sans-serif-font-family">
                Het document bevat:
              </p>
              <ul class="rvo-default-list">
                <li>Het AI-verordening profiel</li>
                <li>De geldende verplichtingen met bijbehorende bronnen</li>
                <li>De gemaakte keuzes in de beslishulp (inclusief eventuele opmerkingen)</li>
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
              class="utrecht-button utrecht-button--secondary-action utrecht-button--rvo-md"
              @click="handleCancel"
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
