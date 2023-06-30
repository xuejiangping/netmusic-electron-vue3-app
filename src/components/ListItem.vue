
<script setup lang="ts">
/**  listitem  用于列表组件的列 如歌手 专辑 歌单*/
const { IMG_SIZE_SEARCH_PARAMS } = getCurrentInstance()!.appContext.config.globalProperties.$COMMON

defineProps<{
  img1v1Url: string
}>()

</script>

<template>
  <div class="item">
    <img class="img" :src="img1v1Url + IMG_SIZE_SEARCH_PARAMS.squar.small">
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

  .img {
    width: 3rem;
    aspect-ratio: 1/1;
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