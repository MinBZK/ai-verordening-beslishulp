<script setup lang="ts">
interface Props {
  questionId: string | undefined
  disclaimerScreen: string | undefined
}

defineProps<Props>()
const emit = defineEmits(['reset-event'])
</script>

<template>
  <!--
    Bewust geen <header>/<nav>: de beslishulp wordt als modal in een andere
    applicatie geplaatst. Die host heeft al een banner- en navigatielandmark;
    een tweede maakt de landmarks van de pagina dubbel en niet-uniek.
  -->
  <div class="header">
    <div id="header_logo">
      <!-- Place holder div for logo based on who implements the decision tree -->
    </div>
    <div class="rvo-layout-column">
      <div class="rvo-topnav__background rvo-topnav__background--horizontal-rule">
        <div
          class="rvo-max-width-layout rvo-max-width-layout--md rvo-max-width-layout-inline-padding--sm"
        >
          <div class="rvo-topnav rvo-topnav--lg">
            <ul class="rvo-topnav__list">
              <li v-if="questionId != '1.1' && disclaimerScreen != '0'" class="rvo-topnav__item">
                <button
                  type="button"
                  class="aiv-link-button rvo-link rvo-topnav__link rvo-link--logoblauw"
                  @click="$emit('reset-event')"
                >
                  <span
                    class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
                    aria-hidden="true"
                  ></span>
                  Begin opnieuw
                </button>
              </li>
              <li v-else style="height: 48px">
                <!--                This is an empty space so that when the back to screen button is not there the line doesn't jump-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
