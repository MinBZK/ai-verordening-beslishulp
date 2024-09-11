<script setup lang="ts">
import Sources from '@/components/Sources.vue'

interface Props {
  conclusion: string | null
  obligation: string | null
  labels: string[] | null
  sources: { source: string; url: string | undefined; }[] | undefined
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col py-5 gap-y-5">

    <!--Conclusion/Resultaat section-->
    <DialogTitle as="h3" class="utrecht-heading-2">
      Resultaat
    </DialogTitle>
    <p class="rvo-alert rvo-alert--info rvo-alert--padding-md">
      <span v-html="conclusion" class="rvo-text--italic rvo-text--xl --rvo-font-sans-serif-font-family"></span>
      <slot />
    </p>

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

    <!--          &lt;!&ndash;Labels section TODO remove this later&ndash;&gt;-->
    <!--          <DialogTitle as="h4" class="text-sm font-semibold leading-5 text-gray-900 relative top-5">-->
    <!--            Labels-->
    <!--          </DialogTitle>-->
    <!--          <p class="text-sm text-gray-500 relative top-5">-->
    <!--            {{ labels }}-->
    <!--            <slot />-->
    <!--          </p>-->

  </div>
</template>
