<script setup lang="ts">
// ipcRenderer.on('test', console.log)
import { useIpcRenderer } from '@vueuse/electron'
import { bg } from 'element-plus/es/locale';
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





// function getMovementPos(el: HTMLElement) {

//   const pos = ref({ x: 0, y: 0 })
//   // type Types='mousedown'|'mouseup'|'mousemove'
//   type Listener_A = Parameters<typeof el.addEventListener<'mousedown'>>['1']
//   type Listener_B = Parameters<typeof el.addEventListener<'mouseup'>>['1']
//   type Listener_C = Parameters<typeof el.addEventListener<'mousemove'>>['1']

//   const _c: Listener_C = ({ movementX, movementY }) => pos.value = { x: movementX, y: movementY }
//   const _a: Listener_A = () => {
//     el.addEventListener('mousemove', _c)
//   }
//   const _b: Listener_B = () => {
//     el.removeEventListener('mousemove', _c)
//   }
//   el.addEventListener('mousedown', _a)
//   el.addEventListener('mouseup', _b)
//   return {
//     clear() {
//       el.removeEventListener('mousedown', _a)
//       el.removeEventListener('mouseup', _b)
//     }, pos
//   }
// }



</script>

<template>
  <div class="box ">
    <div class="drag">菜单栏</div>
    <div class="lyric">
      <div class="item drag">
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
.box {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  transition: 0.5s all;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);

  }

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
