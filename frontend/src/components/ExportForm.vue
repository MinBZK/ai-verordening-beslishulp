<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

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

const modalRef = ref<HTMLElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLElement | null>(null)
/* Het element dat de focus had voordat de dialoog openging. Daar moet de
   focus na het sluiten weer naartoe (WCAG 2.4.3 Focus Order). */
let elementBeforeOpen: HTMLElement | null = null
/* De elementen die wij op inert hebben gezet, zodat we bij het sluiten alleen
   die weer vrijgeven en niets aanraken wat de host zelf inert had gemaakt. */
let inertedElements: HTMLElement[] = []

/*
 * De focustrap houdt Tab binnen de dialoog, maar een screenreadergebruiker die
 * met de virtuele cursor navigeert leest gewoon door naar de pagina erachter.
 * inert haalt die inhoud uit zowel de focusvolgorde als de toegankelijkheidsboom.
 *
 * inert gaat op de broers en zussen van de modal, niet op een voorouder: de
 * modal staat in de DOM van de conclusie, dus een voorouder inert maken zou de
 * dialoog zelf ook uitschakelen.
 */
function setBackgroundInert(inert: boolean) {
  if (!inert) {
    inertedElements.forEach((element) => element.removeAttribute('inert'))
    inertedElements = []
    return
  }
  const modal = modalRef.value
  if (!modal) return
  for (let node = modal; node.parentElement; node = node.parentElement) {
    for (const sibling of Array.from(node.parentElement.children)) {
      if (sibling === node || !(sibling instanceof HTMLElement)) continue
      if (sibling.hasAttribute('inert')) continue
      sibling.setAttribute('inert', '')
      inertedElements.push(sibling)
    }
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusableElements(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(dialogRef.value.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.offsetParent !== null
  )
}

/*
 * Houd Tab binnen de dialoog. Zonder deze afhandeling loopt de focus door naar
 * de inhoud erachter, die visueel is afgedekt maar wel bereikbaar blijft.
 */
function trapFocus(event: KeyboardEvent) {
  const elements = focusableElements()
  if (elements.length === 0) return

  const first = elements[0]!
  const last = elements[elements.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && (active === first || !dialogRef.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.isOpen) return

  if (event.key === 'Escape') {
    // De beslishulp draait zelf in een modal van de host. Zonder stopPropagation
    // sluit één druk op Escape beide dialogen tegelijk.
    event.stopPropagation()
    handleCancel()
    return
  }

  if (event.key === 'Tab') {
    trapFocus(event)
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      elementBeforeOpen = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', handleKeydown, true)
      nextTick(() => {
        setBackgroundInert(true)
        closeButtonRef.value?.focus()
      })
    } else {
      document.removeEventListener('keydown', handleKeydown, true)
      setBackgroundInert(false)
      elementBeforeOpen?.focus()
      elementBeforeOpen = null
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown, true)
  setBackgroundInert(false)
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
  <div v-show="isOpen" ref="modalRef" id="aiv-export-modal" class="minbzk-modal">
    <div class="modal-underlay" @click="handleBackdropClick"></div>
    <div
      ref="dialogRef"
      class="modal-content-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aiv-export-modal-title"
    >
      <button
        ref="closeButtonRef"
        type="button"
        class="modal-content-close"
        aria-label="Sluiten"
        @click="handleCancel"
      >
        &#xd7;
      </button>

      <div class="modal-content">
        <!-- Form = alles binnen modal -->
        <form @submit.prevent="handleExport" class="flex flex-col h-full">

          <!-- Scrollbare body -->
          <div class="modal-body flex-grow overflow-auto space-y-4">
            <h2 id="aiv-export-modal-title" class="utrecht-heading-3">
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
              <label for="aiv-algorithm-name" class="rvo-label">Naam algoritme</label>
              <input
                id="aiv-algorithm-name"
                v-model="formData.algorithmName"
                type="text"
                class="utrecht-textbox utrecht-textbox--rvo-sm w-full"
              >
            </div>

            <div>
              <label for="aiv-description" class="rvo-label">Omschrijving</label>
              <textarea
                id="aiv-description"
                v-model="formData.description"
                rows="3"
                class="utrecht-textarea utrecht-textarea--rvo-sm w-full"
              ></textarea>
            </div>

            <div>
              <label for="aiv-filled-by" class="rvo-label">Ingevuld door</label>
              <input
                id="aiv-filled-by"
                v-model="formData.filledBy"
                type="text"
                autocomplete="name"
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
