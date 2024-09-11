<script setup lang="ts">
interface Props {
  soort_toepassing_state: string,
  open_source_state: string,
  publicatiecategorie_state: string,
  systeemrisico_state: string,
  transparantieverplichtingen_state: string,
  rol_state: string,
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
    <div :class="change_status(soort_toepassing_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Soort toepassing
      </a>
    </div>
    <div :class="change_status(open_source_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Open-source
      </a>
    </div>
    <div :class="change_status(publicatiecategorie_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Publicatiecategorie
      </a>
    </div>
    <div :class="change_status(systeemrisico_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Systeemrisico
      </a>
    </div>
    <div :class="change_status(transparantieverplichtingen_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Transparantieverplichtingen
      </a>
    </div>
    <div :class="change_status(rol_state)">
      <a class="rvo-link rvo-progress-tracker__step-link">
        Rol
      </a>
    </div>
    <div
      class="rvo-progress-tracker__step rvo-progress-tracker__step--md rvo-progress-tracker__step--end rvo-image-bg-progress-tracker-start-end-md--after">
      Conclusie
    </div>
  </div>
</template>
