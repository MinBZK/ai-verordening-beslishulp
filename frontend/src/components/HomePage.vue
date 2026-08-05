// src/components/HomePage.vue

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Disclaimer from '@/components/Disclaimer.vue'

defineEmits(['acceptDisclaimer'])
</script>

<template>
  <!-- Skip-link: eerste focusbare element, zodat toetsenbordgebruikers de navigatie kunnen overslaan -->
  <a class="aiv-skip-link rvo-link" href="#beslishulp-inhoud">Ga direct naar de inhoud</a>
  <Header
    :question-id="'1.1'"
    :disclaimer-screen="'0'"/>
  <main id="beslishulp-inhoud" tabindex="-1">
    <div class="rvo-progress-tracker">
    </div>
    <div class="rvo-form">
      <div class="flex items-center rvo-layout-column rvo-layout-gap--xl">
        <div class="flex justify-center rvo-form-intro inline-flex py-5">
          <h1 class="flex justify-center utrecht-heading-2">Beslishulp AI-verordening</h1>
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
          <button
type="button" class="utrecht-button utrecht-button--primary-action utrecht-button--rvo-md rvo-link--no-underline"
                  @click="$emit('acceptDisclaimer')">
            Akkoord en begin met de beslishulp
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
