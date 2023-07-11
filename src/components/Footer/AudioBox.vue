<script setup lang="ts">

import usePlayStateStore from '../../store/play_state_store'

const { playProgressBarIsPressed } = storeToRefs(usePlayStateStore())

/**
 * inputVal  输入值，用来更新播放器的curtime
 */

const props = defineProps<{
  curSongInfo: SongItem,
  volume: number,
  playProgress: number,
  inputVal?: number

}>()
const audioEL = ref<HTMLAudioElement>()


//*************************************************
watch(() => props.volume, (newVal) => {
  setVolume(newVal)
})

watch(() => props.inputVal, (newVal) => {
  console.log('newVal', newVal)
  if (newVal !== undefined) {
    setPlayProgress(newVal)
  }

})

//==========================================================
//
//        业务函数
//
//==========================================================

function setVolume(val: number) {
  audioEL.value!.volume = val / 100
}
/**
 * 
 * @param val 设定的播放时间，单位秒
 */
function setPlayProgress(val: number) {
  const el = unref(audioEL)
  if (el) el.currentTime = val

}



/**************************************************
*
*
*        audio事件处理函数
*
*
 **************************************************/
function errorSong() { }
function updateSongTime() {
  //playProgressBarIsPressed 进度条被按下期间 不更新歌曲时间
  if (playProgressBarIsPressed.value) return
  const el = unref(audioEL)
  if (!el) return
  const time = el.currentTime
  emit('updateSongTime', time)

}
function canplaySong() {
  audioEL.value?.play()
}
function playSong() { }

function endedSong() { }

//==========================================================
//
//
//        emits 
//
//
//==========================================================
/**
 * per：当前播放时间占歌曲长度的百分比;
 * time: 当前播放时间，单位 秒;
 */
const emit = defineEmits<{
  (event: 'updateSongTime', time: number): any
}>()


</script>

<template>
  <audio v-if="curSongInfo" ref="audioEL" preload="auto" @canplay="canplaySong" @playing="playSong" @ended="endedSong"
    @error="errorSong" @timeupdate="updateSongTime" :src="curSongInfo.audioUrl"></audio>
</template>

<style scoped></style>
