<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  questionId: string | undefined
  disclaimerScreen: string | undefined
}

defineProps<Props>()
const emit = defineEmits(['reset-event'])

const version = ref<string>('...')

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/MinBZK/ai-verordening-beslishulp/releases/latest')
    const data = await response.json()
    version.value = data.tag_name || 'N/A'
  } catch (error) {
    console.error('Error fetching version:', error)
    version.value = 'Error'
  }
})
</script>

<template>
  <div class="rvo-layout-column rvo-theme">
  <div class="rvo-alert rvo-alert--warning rvo-alert--padding-sm">
  <span class="utrecht-icon rvo-icon rvo-icon-waarschuwing rvo-icon--xl rvo-status-icon-waarschuwing"
        role="img"
        aria-label="Waarschuwing"></span>
  <div class="rvo-alert-text">
    <div>
        <b>Bètaversie
          <a class="rvo-link" href="https://github.com/MinBZK/ai-verordening-beslishulp">{{ version }}</a>
        </b>
        Deze beslishulp is in ontwikkeling. Alle versies ontstaan op een open manier. Iedereen mag opmerkingen en suggesties doen.
      </div>
  </div>
</div>
  </div>
  <header class="header">
    <div id="header_logo">
      <!-- Place holder div for logo based on who implements the decision tree -->
    </div>
    <div class="rvo-layout-column rvo-layout-gap--2xl">
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
