// src/components/HomePage.vue

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Disclaimer from '@/components/Disclaimer.vue'

const emit = defineEmits(['acceptDisclaimer'])
</script>

<template>
  <Header
    :questionId="'1.1'"
    :disclaimer-screen="'0'"/>
  <main>
    <div class="rvo-progress-tracker">
    </div>
    <div class="rvo-form">
      <div class="flex items-center rvo-layout-column rvo-layout-gap--xl">
        <div class="flex justify-center rvo-form-intro inline-flex py-5">
          <h2 class="flex justify-center utrecht-heading-2">Beslishulp AI-verordening</h2>
        </div>
        <div class="rvo-layout-column rvo-layout-gap--md rvo-max-width-layout rvo-max-width-layout--lg">
          <div class="utrecht-form-fieldset rvo-form-fieldset">
            <fieldset
              class="utrecht-form-fieldset__fieldset utrecht-form-fieldset--html-fieldset"
            >
              <!-- Gebruik de Disclaimer component -->
              <Disclaimer />
              <br>
            </fieldset>
          </div>
        </div>
        <div class="py-5 px-5">
          <button @click="$emit('acceptDisclaimer')" type="button"
                  class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md rvo-link--no-underline">
            Akkoord en begin met de beslishulp
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
