<script setup lang="ts">


const activeIndex = ref(0)
withDefaults(defineProps<{
  cover: string,
  tagInfoEnum?: {
    [key: string]: { index: number, suffix?: string }
  },
  type: string
}>(), {
  cover: "http://p1.music.126.net/w2b9v-oFdi2eirpvK5gblg==/109951168630690220.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzI4NzMxNTcwNzA2L2E0ZDAvMjAyMzUxNDEwNDU1MC94MzEzMTY4NjcxMDc1MDc1NS5wbmc=&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&",
  tagInfoEnum: () => ({ 标签1: { index: 0 }, 标签2: { index: 1 }, 标签3: { index: 2 } }),
  type: '前缀'
})

const emit = defineEmits<{
  (event: 'handleTabsChange', i: any): void
}>()
let a = console.log
</script>

<template>
  <div class="container">
    <div class="top">
      <div>
        <div class="cover" :class="{ heijiao: type === '专辑' }">
          <img :src="cover">
        </div>
      </div>
      <div class="info">
        <h2 class="title">
          <span v-if="type" class="prefix">{{ type }}</span>
          <slot name="info-line-1">1行</slot>
        </h2>
        <ul class="lists">
          <li>
            <slot name="info-line-2">2行</slot>
          </li>
          <li>
            <slot name="info-line-3">3行</slot>
          </li>
          <li>
            <slot name="info-line-4">4行</slot>
          </li>
          <li class="line-5" v-title>
            <slot name="info-line-5">5行</slot>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <slot name="middle">
        <el-tabs class="tabs" @tab-click="a" v-model="activeIndex" @tab-change="(i) => emit('handleTabsChange', i)">
          <el-tab-pane v-for="({ index, suffix }, label ) in tagInfoEnum" :key="index" :label="label + (suffix || '')"
            :name="index"></el-tab-pane>
        </el-tabs>
      </slot>
    </div>
    <div class="bottom">
      <slot name="default">
        歌曲
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';
// @import (reference) "@/assets/css/global.less";

.container {

  .top {
    display: grid;
    grid-template-columns: minmax(140px, 1fr) 3fr;
    column-gap: 1.5625rem;
    font-size: 1rem;

    .cover {

      img {
        width: 100%;
        border-radius: 8px;
        aspect-ratio: 1/1;

      }

    }

    .heijiao {
      background-image: url('@/assets/img/vinyl.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right -5px;

      img {
        width: 88%;
        box-shadow: 5px 0px 3px 3px #ffffff1f;
      }
    }


    .info {

      .title {

        .prefix {
          border: 1px solid;
          color: #fff;
          background-color: var(--color-theme);
          padding: 3px;
          font-size: 0.6rem;
          margin-right: 0.5rem;
          border-radius: 5px;
          vertical-align: middle;
          font-weight: normal;
        }
      }

    }

    .lists {

      .line-5 {
        .multi-line(2);
        color: var(--color-text);
      }

      li {
        margin: 8px 0;

        &:deep(>*) {
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>
