<script setup lang="ts">


const activeIndex = ref(0)
withDefaults(defineProps<{
  cover: string,
  tagInfoEnum?: {
    [key: string]: { index: number, suffix?: string }
  }
}>(), {
  cover: "http://p1.music.126.net/w2b9v-oFdi2eirpvK5gblg==/109951168630690220.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzI4NzMxNTcwNzA2L2E0ZDAvMjAyMzUxNDEwNDU1MC94MzEzMTY4NjcxMDc1MDc1NS5wbmc=&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&",
  tagInfoEnum: () => ({ 标签1: { index: 0 }, 标签2: { index: 1 }, 标签3: { index: 2 } })
})

const emit = defineEmits<{
  (event: 'handleTabsChange', i: any): void
}>()

</script>

<template>
  <div class="container">
    <div class="top">
      <div class="cover">
        <img :src="cover" alt="" srcset="">
      </div>
      <div class="info">
        <ul class="lists">
          <li>
            <h2>
              <slot name="info-line-1">1行</slot>
            </h2>
          </li>
          <li>
            <slot name="info-line-2">2行</slot>
          </li>
          <li>
            <slot name="info-line-3">3行</slot>
          </li>
          <li>
            <slot name="info-line-4">4行</slot>
          </li>
          <li>
            <slot name="info-line-5">5行</slot>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <slot name="middle">
        <el-tabs class="tabs" v-model="activeIndex" @tab-change="(i) => emit('handleTabsChange', i)">
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
.container {

  .top {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    font-size: .75rem;

    .cover {

      img {
        width: 100%;
        border-radius: 8%;
        aspect-ratio: 1/1;
      }
    }

    .info {
      padding: 0 20px;

    }

    .lists {


      li {
        margin: 8px 0;

        &:nth-child(1) {
          color: red;
          font-weight: bolder;
        }

        &:deep(>*) {
          padding-right: 1rem;
        }


      }
    }
  }
}
</style>
