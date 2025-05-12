<script setup lang="ts">
interface Props {
  loading: boolean
}
defineProps<Props>()
</script>

<template>
  <div v-if="loading" class="ai-decisiontree-loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.ai-decisiontree-loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.ai-decisiontree-loader div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  background: #408ec6;
}
.ai-decisiontree-loader div:nth-child(1) {
  left: 8px;
  animation: ai-decisiontree-loader1 0.6s infinite;
}
.ai-decisiontree-loader div:nth-child(2) {
  left: 8px;
  animation: ai-decisiontree-loader2 0.6s infinite;
}
.ai-decisiontree-loader div:nth-child(3) {
  left: 32px;
  animation: ai-decisiontree-loader2 0.6s infinite;
}
.ai-decisiontree-loader div:nth-child(4) {
  left: 56px;
  animation: ai-decisiontree-loader2 0.6s infinite;
}
.ai-decisiontree-loader div:nth-child(5) {
  left: 72px;
  animation: ai-decisiontree-loader3 0.6s infinite;
}
@keyframes ai-decisiontree-loader1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ai-decisiontree-loader2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
@keyframes ai-decisiontree-loader3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
<!-- #1E2761, #408EC6, #7A2048 -->
