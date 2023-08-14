<script setup lang="ts">
withDefaults(defineProps<{
  color?: string,
  size?: string
}>(), {
  color: 'var(--color-text-link)',
  size: '1rem'
})
</script>

<template>
  <el-link :style="{ color, fontSize: size }"></el-link>
</template>

<style scoped></style>
