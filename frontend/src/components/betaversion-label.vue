<template>
  <div class="px-5">
    <div
      class="rvo-tag rvo-tag--with-icon rvo-tag--active rvo-tag--warning"
    style="padding-left: 12px; padding-right: 12px">
            <span
              class="utrecht-icon rvo-icon rvo-icon-waarschuwing rvo-icon--lg"
              role="img"
              aria-label="Waarschuwing"
            ></span>
      <div class="utrecht-alert--warning utrecht-paragraph">
        <details class="rvo-expandable-text rvo-expandable-text--subtle">
          <summary class="rvo-expandable-text__summary">
            Bètaversie
          </summary>
          <div class="rvo-expandable-text__details absolute"
               style="margin-left: -38px; margin-top: 10px;padding: 16px; border-radius: 5px; background-color: var(--rvo-alert-warning-background-color); width: 220px; z-index: 2">
            Deze beslisboom is in ontwikkeling. Alle versies ontstaan op een open manier.
            <a class="rvo-link" href="https://github.com/MinBZK/ai-act-decisiontree">
              Iedereen
              mag opmerkingen en suggesties doen.
            </a>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>
