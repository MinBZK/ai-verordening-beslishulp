<script setup lang="ts">
interface Props {
  type_ai_systeem_state: string,
  open_source_state: string,
  uitzonderingsgrond_state: string,
  risicocategorie_state: string,
  systeemrisico_state: string,
  transparantie_risico_state: string,
  entiteit_rol_state: string,
}

defineProps<Props>()

function change_status(category: string) {
  return 'rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-image-bg-progress-tracker-' + category + '-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before rvo-progress-tracker__step--' + category
}

</script>

<template>
  <!--  TODO: Replace link with other type same color-->
  <div class="rvo-progress-tracker">
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--start rvo-image-bg-progress-tracker-start-end-md--after rvo-progress-tracker__step--straight rvo-image-bg-progress-tracker-line-straight--before"
    >
    </div>
    <div :class="change_status(type_ai_systeem_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Type AI-Systeem
      </a>
    </div>
    <div :class="change_status(open_source_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Open-source
      </a>
    </div>
    <div :class="change_status(uitzonderingsgrond_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Uitzonderingsgrond
      </a>
    </div>
    <div :class="change_status(risicocategorie_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Risicocategorie
      </a>
    </div>
    <div :class="change_status(systeemrisico_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Systeemrisico
      </a>
    </div>
    <div :class="change_status(transparantie_risico_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Transparantierisico
      </a>
    </div>
    <div :class="change_status(entiteit_rol_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Entiteit/rol
      </a>
    </div>
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--end rvo-image-bg-progress-tracker-start-end-md--after">
      Conclusie
    </div>
  </div>
</template>
