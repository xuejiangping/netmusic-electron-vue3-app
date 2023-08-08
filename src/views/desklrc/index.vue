<script setup lang="ts">
// ipcRenderer.on('test', console.log)
import { useIpcRenderer } from '@vueuse/electron'
import { shallowReactive, toRefs } from 'vue';

const { $utils, $store } = getCurrentInstance()?.proxy!

const { isPaused } = storeToRefs($store.usePlayStateStore())

const ipcRenderer = useIpcRenderer()
ipcRenderer.on('lyric_data', (_, data) => {
  const _data = (JSON.parse(data) as DeskLyric.DeskLrcData)
  lyricData.value = _data.lyric
  console.log(_data)
})

const { lyricData } = toRefs(shallowReactive({
  lyricData: {} as DeskLyric.LyricData
}))


onMounted(() => {
  let bgBox = document.querySelector('.bg-box') as HTMLElement
  if (bgBox) {
    let timer: any
    let boxEl = bgBox.firstElementChild
    let titleEl = bgBox.querySelector('.title')
    const handler = $utils.debounce(() => {
      boxEl?.classList.toggle('active')
      titleEl?.classList.toggle('hide')
    }, 1000)
    // handler()
    timer = setTimeout(handler, 2000);
    bgBox.addEventListener('mouseenter', () => {
      if (timer) clearTimeout(timer)
      handler()
    })


  }
})


function close() {
  ipcRenderer.invoke('close')
}

</script>

<template>
  <div class="bg-box">
    <div class="box drag active">
      <div class=" title ">
        <el-space>
          <el-link> <i class="iconfont icon-audio-prev "></i></el-link>
          <el-link v-if="isPaused"> <i class="iconfont icon-play"></i></el-link>
          <el-link v-else> <i class="iconfont icon-pause "></i></el-link>
          <el-link> <i class="iconfont icon-audio-next "></i></el-link>
        </el-space>
        <el-link style="float: right;color: inherit;" class="no-drag" @click="close">
          <i class="iconfont icon-closed  "></i>
        </el-link>

      </div>
      <div class="lyric">
        <div class="item ">
          <div class="line">
            <span class="text ">
              <!-- 11111111111111111111111113231111111111111111111111111111111111111111223 -->
            </span>
          </div>
          <div class="line"><span class="text ">{{ lyricData.txt }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg-box {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

}

.active {
  background-color: rgba(0, 0, 0, 0.4);

}

.hide {
  display: none !important;
}


.box {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  // transition: 2s all;

  .title {
    color: var(--color-text-white);
    text-align: center;

    .iconfont {
      color: inherit;
    }

  }

  .lyric {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: min(20vh, 80px);
    overflow: hidden;
    color: hotpink;
    stroke-width: 2px;
    font-weight: 600;
    -webkit-text-stroke: rgb(183, 165, 174) 1px;
    text-align: center;
    letter-spacing: 5px;

    .text {
      background-image: linear-gradient(pink, #efc1ce);
      -webkit-background-clip: text;
      color: transparent;
      // mask-image: linear-gradient(red, blue);


    }


  }

}
</style>
