<script setup lang="ts">
import Sources from '@/components/Sources.vue'
import SubResult from '@/components/SubResult.vue'

interface Props {
  conclusion: string | null
  obligation: string | null
  sources: { source: string; url: string | undefined; }[] | undefined
  category: string | undefined
  'labels': { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()
defineEmits(['back'])
</script>

<template>

  <div class="flex flex-col py-5 gap-y-5 rvo-max-width-layout--md">
    <div class="flex">
      <div as="h3" class="utrecht-heading-2">Resultaat</div>
    </div>
    <!--Conclusion/Resultaat section-->
    <p class="rvo-alert--success rvo-alert--padding-md">
      <span v-html="conclusion" class="rvo-text--italic rvo-text--xl --rvo-font-sans-serif-font-family"></span>
      <slot />
    </p>
    <div class="rvo-accordion">
      <!--   Profile labels section  -->
      <SubResult :category="category" :labels="labels" title="AI-verordening Profiel" conclusion="conclusion" />

      <!-- Accordion for Obligation/Verplichtingen section, visible only if there are obligations -->
      <div v-if="obligation">
        <details class="rvo-accordion__item">
          <summary class="rvo-accordion__item-summary rvo-heading--no-margins rvo-heading--mixed">
            <h3
              class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed items-center">
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omlaag rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--closed"
                role="img" aria-label="Delta omlaag"></span>
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omhoog rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--open"
                role="img" aria-label="Delta omhoog"></span>
              Verplichtingen
            </h3>
            <span class="rvo-accordion-teaser">Bekijk hier de voor jou geldende verplichtingen</span>
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
              class="utrecht-heading-3 rvo-accordion__item-title rvo-heading--no-margins rvo-heading--mixed items-center">
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omlaag rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--closed"
                role="img" aria-label="Delta omlaag"></span>
              <span
                class="utrecht-icon rvo-icon rvo-icon-delta-omhoog rvo-icon--md rvo-icon--hemelblauw rvo-accordion__item-icon--open"
                role="img" aria-label="Delta omhoog"></span>
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
      <span class="utrecht-icon rvo-icon rvo-icon-info rvo-icon--xl rvo-status-icon-info" role="img"
        aria-label="Info"></span>
      <div class="rvo-alert-text">
        <div>
          <div>
            Mocht u vragen of opmerkingen hebben naar aanleiding van deze beslishulp, mail dan gerust naar
            <a href="mailto:ai-verordening@minbzk.nl" class="rvo-link rvo-link--logoblauw">ai-verordening@minbzk.nl</a>
          </div>
        </div>
      </div>
    </div>
    <!--Vorige vraag section-->
    <div class="rvo-layout-margin-vertical--2xl">
      <button @click="$emit('back')" type="button"
        class="flex utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline ">
        Vorige vraag
      </button>
    </div>

  </div>
</template>
