<script setup lang="ts">
const emit = defineEmits(['reset-event'])
</script>

<template>
  <header class="header">
    <div class="rvo-header__logo-wrapper">
      <div class="rvo-logo rvo-header__logo-img">
        <div class="rvo-logo__emblem">
          <img src="@nl-rvo/assets/images/emblem.svg">
        </div>
      </div>
    </div>
    <div class="rvo-layout-column rvo-layout-gap--2xl">
      <div class="rvo-topnav__background rvo-topnav__background--horizontal-rule">
        <div class="rvo-max-width-layout rvo-max-width-layout--md rvo-max-width-layout-inline-padding--none">
          <nav class="rvo-topnav rvo-topnav--lg">
            <ul class="rvo-topnav__list">
              <li class="rvo-topnav__item">
                <a class="rvo-link rvo-topnav__link rvo-link--logoblauw" @click="$emit('reset-event')">
                <span
                  class="utrecht-icon rvo-icon rvo-icon-terug rvo-icon--lg rvo-icon--wit"
                  role="img"
                  aria-label="Terug"
                ></span>
                  Terug naar het begin
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
