
<script setup lang="ts">
/**  listitem  用于列表组件的列 如歌手 专辑 歌单*/

withDefaults(defineProps<{
  img1v1Url: string,
  type?: ListType
  cover_width?: string
}>(), {
  cover_width: '4rem'
})
defineEmits(['icon_play_click_handler'])
</script>

<template>
  <div class="item">
    <!-- <img class="img" :src="img1v1Url"> -->
    <div class="left">
      <div class="cover" :style="{ width: cover_width }">
        <MyImage :is-album="type === 'album'" :src="img1v1Url"></MyImage>
        <i v-if="type === 'song'" @click="$emit('icon_play_click_handler')" class="iconfont icon-play"></i>
      </div>
      <div style="flex: 1;">
        <slot></slot>
      </div>

    </div>
    <div class="middle">
      <slot name="middle"></slot>
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
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  align-items: center;
  border-radius: 4px;
  color: var(--color-text);

  .cover {
    position: relative;
    margin-right: 0.8rem;

    .icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      font-size: 2rem;
      color: rgb(230, 213, 213);
    }
  }

  .hover-scale-mixin();

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>