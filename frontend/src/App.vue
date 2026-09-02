<script setup lang="ts">
import BeslishulpForm from '@/components/BeslishulpForm.vue'
import '@nl-rvo/component-library-css/dist/index.css'
import '@nl-rvo/assets/fonts/index.css'
import '@nl-rvo/assets/icons/index.css'
import '@nl-rvo/assets/images/index.css'
import '@nl-rvo/design-tokens/dist/index.css'
</script>

<template>
  <!--
    lang staat op de wrapper en niet op <html>: de beslishulp wordt als onderdeel
    in een andere applicatie gemonteerd en kan de taal van de host niet bepalen.
  -->
  <div class="rvo-theme" lang="nl">
    <BeslishulpForm />
  </div>
</template>
