
<script setup lang="ts">
/**  listitem  用于列表组件的列 如歌手 专辑 歌单*/

defineProps<{
  img1v1Url: string
}>()

</script>

<template>
  <div class="item">
    <!-- <img class="img" :src="img1v1Url"> -->
    <div class="cover">
      <MyImage aspect-ratio="1/1" :src="img1v1Url"></MyImage>
    </div>
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import (reference) "@/assets/css/global.less";

.item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  font-size: 0.8rem;

  .cover {
    width: 4rem;
    aspect-ratio: 1/1;
    margin-right: 1rem
  }

  .hover-scale-mixin();

  .left {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }

  .right {
    margin-left: 2rem;
    align-self: center;
  }

  img {
    border-radius: 15%;
    margin-right: 0.8rem;

  }

}
</style>