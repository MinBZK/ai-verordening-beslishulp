<script setup lang="ts">
interface Props {
  ai_act_applicable_state: string,
  risk_group_state: string,
}

defineProps<Props>()

function change_status(category: string) {
  return 'rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-image-bg-progress-tracker-' + category + '-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before rvo-progress-tracker__step--' + category
}

</script>

<template>
  <div class="rvo-progress-tracker">
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--start rvo-image-bg-progress-tracker-start-end-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before"
    >
    </div>
    <div :class="change_status(ai_act_applicable_state)">
      <a class="progress-tracker-font rvo-progress-tracker__step-link">
        Geldt de AI-verorderning voor mij?
      </a>
    </div>
    <div :class="change_status(risk_group_state)">
      <a class="progress-tracker-font rvo-progress-tracker__step-link">
        Zo ja, in welke risicogroep valt de toepassing?
      </a>
    </div>
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--end rvo-image-bg-progress-tracker-start-end-md--after">
      Vervolgstappen per risicogroep
    </div>
  </div>
</template>
