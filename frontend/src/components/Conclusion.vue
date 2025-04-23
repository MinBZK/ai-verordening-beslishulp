<script setup lang="ts">
import Sources from '@/components/Sources.vue'
import SubResult from '@/components/SubResult.vue'
import ExportForm from '@/components/ExportForm.vue'
import { ref, onMounted, computed, provide, getCurrentInstance } from 'vue'
import type { UserDecision } from '@/models/DecisionTree.ts'
import { exportToPdf } from '@/services/pdfExport'
import { filterLabels } from '@/services/labelsService'

interface Props {
  conclusion: string | null
  obligation: string | null
  sources: { source: string; url: string | undefined }[] | undefined
  category: string | undefined
  labels: any
}

const props = defineProps<Props>()
defineEmits(['back'])

// Gebruik ref voor reactieve data
const sessionUserDecisionPath = ref<UserDecision[]>([])
const isExportDialogOpen = ref(false)

const showCloseOnEnd = getCurrentInstance()!.appContext.config.globalProperties.showCloseOnEnd
const showExportPDF = getCurrentInstance()!.appContext.config.globalProperties.showExportPDF
const showCloseOnEndMsg = getCurrentInstance()!.appContext.config.globalProperties.showCloseOnEndMsg

const informDone = function () {
  const isInIframe = window !== window.parent
  if (isInIframe) {
    window.parent.postMessage(
      {
        event: 'beslishulp-done',
        value: 'true'
      },
      '*'
    )
  } else {
    const event = new CustomEvent('beslishulp-done', {
      detail: { value: 'true' }
    })
    window.dispatchEvent(event)
  }
}

// onMounted voor lifecycle hook
onMounted(() => {
  // Haal de answers op uit sessionStorage wanneer de component wordt geladen
  const userDecisionPathData = sessionStorage.getItem('userDecisionPath')
  if (userDecisionPathData) {
    sessionUserDecisionPath.value = JSON.parse(userDecisionPathData)
  }
})

const openExportDialog = () => {
  isExportDialogOpen.value = true
}

const closeExportDialog = () => {
  isExportDialogOpen.value = false
}

// Provide the openExportDialog function to child components
provide('openExportDialog', openExportDialog)

const handleExport = (formData: {
  algorithmName: string
  description: string
  filledBy: string
}) => {
  if (props.conclusion) {
    const processedLabels = filterLabels(props.labels)
    exportToPdf(
      `${formData.algorithmName.trim() || 'beslishulp'}.pdf`,
      sessionUserDecisionPath.value,
      props.conclusion,
      props.sources,
      props.obligation,
      formData.algorithmName.trim(),
      formData.description.trim(),
      formData.filledBy.trim(),
      processedLabels
    )
  }
}
</script>

<template>
  <div class="flex flex-col py-5 gap-y-5 rvo-max-width-layout--md">
    <div class="flex">
      <div as="h3" class="utrecht-heading-2">Resultaat</div>
    </div>

    <!--Conclusion/Resultaat section-->
    <p class="rvo-alert--success rvo-alert--padding-md">
      <span
        v-html="conclusion"
        class="rvo-text--italic rvo-text--xl --rvo-font-sans-serif-font-family"
      ></span>
      <slot />
    </p>

    <!--Vorige vraag and export buttons section-->
    <div class="rvo-layout-margin-vertical--2xs flex justify-end">
      <a
        class="rvo-link rvo-link--with-icon"
        href="#"
        @click="$emit('back')"
        style="margin-right: auto"
      >
        <span
          class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--md rvo-icon--hemelblauw rvo-link__icon--before"
          role="img"
          aria-label="Vorige stap"
        ></span>
        Vorige stap
      </a>

      <button
        v-if="showExportPDF"
        @click="openExportDialog"
        type="button"
        class="rvo-layout-margin-horizontal--xs flex utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
      >
        <span
          class="utrecht-icon rvo-icon rvo-icon-downloaden rvo-icon--md rvo-icon--hemelblauw"
          role="img"
          aria-label="Exporteer naar PDF"
        ></span>
        Exporteer naar PDF
      </button>

      <button
        v-if="showCloseOnEnd"
        @click="informDone"
        type="button"
        class="rvo-layout-margin-horizontal--xs flex utrecht-button utrecht-button--primary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline"
      >
        {{ showCloseOnEndMsg }}
      </button>
    </div>

    <div class="rvo-accordion">
      <!--   Profile labels section  -->
      <SubResult
        :category="category"
        :labels="labels"
        title="AI-verordening Profiel"
        :conclusion="conclusion"
      />

      <!-- Accordion voor Antwoorden, zichtbaar als er sessionUserDecisionPath zijn -->
      <div v-if="sessionUserDecisionPath">
        <details class="rvo-accordion__item">
          <summary class="rvo-accordion__item-summary rvo-heading--no-margins rvo-heading--mixed">
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
              Antwoorden
            </h3>
            <span class="rvo-accordion-teaser"
              >Bekijk hier het door jou bewandelde pad door de beslishulp</span
            >
          </summary>
          <div class="rvo-accordion__content">
            <div class="rvo-text--md --rvo-font-sans-serif-font-family">
              <ul class="no-list">
                <li
                  class="rvo-layout-margin-vertical--lg"
                  v-for="userDecision in sessionUserDecisionPath"
                >
                  <strong
                    >Vraag <span>{{ String(userDecision.questionId) }}</span
                    >:</strong
                  >
                  <span v-html="userDecision.question"></span><br />
                  <i>Antwoord:</i> <span>{{ userDecision.answer }}</span>
                  <div v-if="userDecision.explanation">
                    <i>Toelichting:</i> <span>{{ userDecision.explanation }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>

      <!-- Accordion for Obligation/Verplichtingen section, visible only if there are obligations -->
      <div v-if="obligation">
        <details class="rvo-accordion__item">
          <summary class="rvo-accordion__item-summary rvo-heading--no-margins rvo-heading--mixed">
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
              Verplichtingen
            </h3>
            <span class="rvo-accordion-teaser"
              >Bekijk hier de voor jou geldende verplichtingen</span
            >
          </summary>
          <div class="rvo-accordion__content">
            <p class="rvo-text--md --rvo-font-sans-serif-font-family">
              <span v-html="obligation"></span>
              <slot />
            </p>
          </div>
        </details>
      </div>

      <!-- Accordion for Sources Section, visible only if there are sources -->
      <div v-if="sources && sources.length > 0">
        <details class="rvo-accordion__item">
          <summary class="rvo-accordion__item-summary rvo-heading--no-margins rvo-heading--mixed">
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
              Bronnen
            </h3>
            <span class="rvo-accordion-teaser">Bekijk hier de bronnen van de verplichtingen</span>
          </summary>
          <div class="rvo-accordion__content">
            <Sources v-if="sources && sources.length > 0" :sources="sources" />
          </div>
        </details>
      </div>
    </div>

    <!--Contact section-->
    <div class="rvo-alert rvo-alert--info rvo-alert--padding-md">
      <span
        class="utrecht-icon rvo-icon rvo-icon-info rvo-icon--xl rvo-status-icon-info"
        role="img"
        aria-label="Info"
      ></span>
      <div class="rvo-alert-text">
        <div>
          <div>
            Mocht u vragen of opmerkingen hebben naar aanleiding van deze beslishulp, mail dan
            gerust naar
            <a href="mailto:ai-verordening@minbzk.nl" class="rvo-link rvo-link--logoblauw"
              >ai-verordening@minbzk.nl</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Export Form Dialog -->
    <ExportForm :is-open="isExportDialogOpen" @close="closeExportDialog" @export="handleExport" />
  </div>
</template>
