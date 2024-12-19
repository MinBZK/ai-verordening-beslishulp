<script setup lang="ts">

interface Props {
  questionId: string | undefined
  disclaimerScreen: string | undefined
}

defineProps<Props>()
const emit = defineEmits(['reset-event'])
</script>

<template>
  <header class="header">
    <div id="header_logo">
      <!-- Place holder div for logo based on who implements the decision tree -->
    </div>
    <div class="rvo-layout-column">
      <div class="rvo-topnav__background rvo-topnav__background--horizontal-rule">
        <div class="rvo-max-width-layout rvo-max-width-layout--md rvo-max-width-layout-inline-padding--sm">
          <nav class="rvo-topnav rvo-topnav--lg">
            <ul class="rvo-topnav__list">
              <li v-if="questionId != '1.2' && disclaimerScreen != '0'" class="rvo-topnav__item">
                <a  class="rvo-link rvo-topnav__link rvo-link--logoblauw" @click="$emit('reset-event')">
                <span
                  class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
                  role="img"
                  aria-label="Terug"
                ></span>
                  Begin opnieuw
                </a>
              </li>
              <li v-else style="height: 48px">
<!--                This is an empty space so that when the back to screen button is not there the line doesn't jump-->
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
