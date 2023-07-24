<script setup lang="ts">
withDefaults(defineProps<{
  color?: string,
}>(), {
  color: 'var(--color-text-link)'
})
</script>

<template>
  <a href="javascript:;" :style="{ color }">
    <slot></slot>
  </a>
</template>

<style scoped></style>
