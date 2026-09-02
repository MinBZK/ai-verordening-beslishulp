<template>
  <div>
    <details class="rvo-expandable-text">
      <summary class="rvo-expandable-text__summary">
        <span
          class="utrecht-icon rvo-icon rvo-icon-info rvo-icon--md rvo-icon--hemelblauw"
          aria-hidden="true"
        ></span>
        Hulp nodig?
      </summary>
      <!-- max-width in plaats van een vaste 55%, zodat de tekst op een smal
           scherm de volle breedte mag gebruiken (WCAG 1.4.10 Reflow). -->
      <div class="rvo-expandable-text__details" style="max-width: 55ch">
        Je hebt aangegeven dat je hulp nodig hebt. Voor advies kun je een e-mail sturen naar
        <a class="rvo-link" href="mailto:ai-verordening@minbzk.nl"> ai-verordening@minbzk.nl </a> of
        op de pleio-omgeving
        <a
          class="rvo-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://algoritmes.pleio.nl"
        >
          https://algoritmes.pleio.nl<span class="aiv-visually-hidden">
            (opent in een nieuw venster)</span
          ></a
        >.
      </div>
    </details>
  </div>
</template>
<script setup lang="ts"></script>
