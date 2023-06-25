<script setup lang="ts">
defineProps<{
  dataList: string[] | null
}>()
</script>

<template>
  <div>singer table</div>
  <h1 v-for="(item, index) in dataList" :key="index">2131</h1>
</template>

<style scoped lang="less"></style>
