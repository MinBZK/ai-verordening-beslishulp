<script setup lang="ts">
import Sources from '@/components/Sources.vue'
import SubResult from '@/components/SubResult.vue'

interface Props {
  conclusion: string | null
  obligation: string | null
  sources: { source: string; url: string | undefined; }[] | undefined
  topic: string | undefined
  'labels': { category: string; assigned_labels: string | undefined; }[] | undefined
}

defineProps<Props>()
defineEmits(['back'])
</script>

<template>
  <div class="flex flex-col py-5 gap-y-5">

    <!--Conclusion/Resultaat section-->
    <div as="h3" class="utrecht-heading-2">
      Resultaat
    </div>
    <p class="rvo-alert rvo-alert--info rvo-alert--padding-md">
      <span v-html="conclusion" class="rvo-text--italic rvo-text--xl --rvo-font-sans-serif-font-family"></span>
      <slot />
    </p>

    <!--   Labels section  -->
    <SubResult
      :topic="topic"
      :labels="labels"
      title="Resultaten"/>

    <!--Obligation/Verplichtingen section-->
    <p style="white-space: pre-line" class="rvo-text--bold rvo-text--md --rvo-font-sans-serif-font-family">
      <span v-html="obligation"></span>
      <slot />
    </p>

    <!--Contact section-->
    <p class="rvo-text--md --rvo-font-sans-serif-font-family">
      Mocht u vragen of opmerkingen hebben naar aanleiding van deze beslisboom, mail dan gerust naar
      <a href="mailto:ai-verordening@minbzk.nl" target="_blank"
         class="text-blue-700 underline">ai-verordening@minbzk.nl</a>.
      <slot />
    </p>

    <!--Sources section-->
    <Sources :sources="sources" />

    <div class="rvo-layout-margin-vertical--2xl">
      <button
        @click="$emit('back')"
        type="button"
        class="flex utrecht-button utrecht-button--secondary-action rvo-layout-row rvo-layout-gap--md utrecht-button--rvo-md rvo-link--no-underline "
      >
        Vorige vraag
      </button>
    </div>

  </div>
</template>
