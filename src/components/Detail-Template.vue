<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="top">
      <div class="cover">头像</div>
      <div class="info">信息</div>
    </div>
    <div class="middle">tab栏</div>
    <div class="bottom">
      <slot name="default">
        歌曲表格
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {

  .top {
    display: grid;
    // grid-template-columns: ;
  }
}
</style>
