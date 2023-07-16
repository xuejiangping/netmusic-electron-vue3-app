<script setup lang="ts">
import defaultImg from '../assets/img/hello.webp'
withDefaults(defineProps<{
  aspectRatio?: '1/1' | '16/10' | 'unset' | string,
  src: string,
  placeholderSrc?: string,
  lazy?: boolean,
  isAlbum?: boolean
}>(), {
  aspectRatio: 'unset',
  placeholderSrc: defaultImg,
  lazy: true

})
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="box">
    <el-image v-bind="$attrs" class="img" :style="{ 'aspect-ratio': aspectRatio }" :src="src" :lazy="lazy">
      <template #placeholder>
        <img class="img" :style="{ 'aspect-ratio': aspectRatio }" :src="placeholderSrc" />
      </template>
    </el-image>
    <img v-if="isAlbum" class="heijiao" src="../assets/img/vinyl.png" alt="">
  </div>
</template>

<style scoped lang="less">
.box {
  position: relative;


  .img {
    width: 100%;
    z-index: 1;
    box-shadow: .4rem 0px .1875rem .1875rem #ffffff33;
    border-radius: 0.5rem;
  }

  .heijiao {
    position: absolute;
    width: 100%;
    right: -10%;
  }
}
</style>
