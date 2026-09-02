<script setup lang="ts">
interface Props {
  sources: { source: string; url: string | undefined }[] | undefined
}

defineProps<Props>()
</script>

<template>
  <div>
    <ul>
      <li v-for="(source, index) in sources" :key="index" class="text-sm flex items-center">
        <!-- When source.url exists -->
        <span
          class="utrecht-icon rvo-icon rvo-icon-info rvo-icon--xl rvo-status-icon-info"
          aria-hidden="true"
        ></span>
        <!-- De beslishulp draait in een modal van een andere applicatie; een bron
             openen in hetzelfde venster zou de ingevulde antwoorden weggooien.
             De link opent daarom in een nieuw venster, wat hieronder ook wordt
             aangekondigd in plaats van alleen visueel te zijn. -->
        <a
          v-if="source.url"
          :href="source.url"
          target="_blank"
          rel="noopener noreferrer"
          class="rvo-link utrecht-link"
        >
          {{ source.source }}
          <span class="aiv-visually-hidden">(opent in een nieuw venster)</span>
          <slot />
        </a>
        <!--        <p class="rvo-icon-info"></p>-->

        <!-- When source.url does not exist -->
        <span v-else class="rvo-link--no-underline">
          {{ source.source }}
          <slot />
        </span>
      </li>
    </ul>
  </div>
</template>
