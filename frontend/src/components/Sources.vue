<script setup lang="ts">
interface Props {
  'sources': { source: string; url: string | undefined; }[] | undefined
}

defineProps<Props>()
</script>

<template>
  <div>
    <ul>
      <li v-for='(source, index) in sources' :key="index" class="text-sm flex items-center">
        <!-- When source.url exists -->
        <span
          class="utrecht-icon rvo-icon rvo-icon-info rvo-icon--xl rvo-status-icon-info"
          role="img"
          aria-label="Info"
        ></span>
        <a v-if="source.url" :href="source.url" target="_blank" class="rvo-link utrecht-link">
          {{ source.source }}
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
