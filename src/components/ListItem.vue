
<script setup lang="ts">
/**  listitem  用于列表组件的列 如歌手 专辑 歌单*/
const { $COMMON } = getCurrentInstance()!.appContext.config.globalProperties

defineProps<{
  img1v1Url: string
}>()

</script>

<template>
  <div class="item">
    <img width="50" height="50" :src="img1v1Url + $COMMON.IMG_SMALL_SIZE_SEARCH_PARAMS">

    <div class="left">

      <slot></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 0.8rem;

  &:hover {
    background-color: #f2f2f3;
  }

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