<script setup lang="ts">

import usePlayStateStore from '../../store/play_state_store'
const store = usePlayStateStore()
const { isUpdateCurTime } = storeToRefs(store)
const { setIsPaused, next } = store
const { $notify } = getCurrentInstance()?.appContext.config.globalProperties!
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
*        audio事件处理函数
*
 **************************************************/
function errorSong() {
  next()
  $notify('播放出错 ,自送跳到下一首')
}
function updateSongTime() {
  //isUpdateCurTime 进度条被按下期间 不更新歌曲时间
  if (isUpdateCurTime.value) return
  const el = unref(audioEL)
  if (!el) return
  const time = el.currentTime
  emit('updateSongTime', time)

}
function canplaySong() {
  audioEL.value?.play()
}
function playSong() {
  // console.log('playSong', playSong)

}

function endedSong() {
  console.log('endedSong')
  next()
}

//==========================================================
//
//        emits 
//
//==========================================================
/**
 * per：当前播放时间占歌曲长度的百分比;
 * time: 当前播放时间，单位 秒;
 */
const emit = defineEmits<{
  (event: 'updateSongTime', time: number): any
}>()

defineExpose({
  play() { audioEL.value?.play() },
  pause() { audioEL.value?.pause() }
})

</script>

<template>
  <audio v-if="curSongInfo" ref="audioEL" preload="auto" @canplay="canplaySong" @playing="playSong" @ended="endedSong"
    @play="setIsPaused(false)" @pause="setIsPaused(true)" @error="errorSong" @timeupdate="updateSongTime"
    :src="curSongInfo.audioUrl"></audio>
</template>

<style scoped></style>
