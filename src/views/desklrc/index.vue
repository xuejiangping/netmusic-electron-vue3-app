<script setup lang="ts">
// ipcRenderer.on('test', console.log)
import { useIpcRenderer } from '@vueuse/electron'
import { reactive, shallowReactive, toRefs, watchEffect } from 'vue';

const ipcRenderer = useIpcRenderer()
ipcRenderer.on('lyric_data', (_, data) => {
  const _data = (JSON.parse(data) as DeskLyric.DeskLrcData)
  lyricData.value = _data.lyric
  console.log(_data)
})

const { lyricData } = toRefs(shallowReactive({
  lyricData: {} as DeskLyric.LyricData
}))

watchEffect(() => console.log(lyricData.value))
console.log('ipcRenderer', ipcRenderer)
function vActive(el: HTMLElement) {
  const bgEl = document.querySelector('.box') as HTMLElement
  if (bgEl && el) {
    el.addEventListener('mouseenter', () => {
      bgEl.classList.add('bg')
      bgEl.classList.remove('no-drag')

    })
    bgEl.addEventListener('mouseleave', () => {
      bgEl.classList.remove('bg')
      bgEl.classList.add('drag')

    })
  }

}
</script>

<template>
  <div class="box drag">
    <div>菜单栏</div>
    <div class="lyric">
      <div v-active class="no-drag">
        <div class="line">
          <span class="text ">
            <!-- 11111111111111111111111113231111111111111111111111111111111111111111223 -->
          </span>
        </div>
        <div class="line"><span class="text ">{{ lyricData.txt }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
  background-color: rgba(0, 0, 0, 0.3);

}

.box {

  height: 100%;
  width: 100%;
  // text-align: center;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  // text-align: center;
  cursor: move;

  .lyric {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: min(20vh, 80px);
    overflow: hidden;
    color: pink;
    stroke: #000;
    stroke-width: 2px;
    font-weight: 600;
    -webkit-text-stroke: rgb(183, 165, 174) 1px;
    text-align: center;
    letter-spacing: 5px;


  }

}
</style>
