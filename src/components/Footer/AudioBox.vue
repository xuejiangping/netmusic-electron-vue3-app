<script setup lang="ts">

const { $notify, $store } = getCurrentInstance()?.proxy!
const store = $store.usePlayStateStore()
const { isUpdateCurTime, userClickPlayActionType, currentSong, playList } = storeToRefs(store)
const { setPauseState, prev, continuePlay, initAudioELcontrol, play } = store
/**
 * inputVal  输入值，用来更新播放器的curtime
 */

const props = defineProps<{
  volume: number,
  currenPlayTime: number,
  inputVal: number
}>()
const audioEL = ref<HTMLAudioElement>()
const audioELcontrol = {
  play() {
    // debugger
    if (!currentSong.value) play(playList.value[0].id)
    audioEL.value?.play().catch(err => {
      $notify('播放出错: ' + err.message)
    })
  },
  pause() { audioEL.value?.pause() }
}
initAudioELcontrol(audioELcontrol)
defineExpose(audioELcontrol)

//*************************************************
watch(() => props.volume, setVolume)

watch(() => props.inputVal, setPlayProgress)

onMounted(() => {
  if (audioEL.value) {
    setPlayProgress(props.currenPlayTime)
    setVolume(props.volume)
  }

})

//==========================================================
//
//        函数
//
//==========================================================

function setVolume(val: number) {

  if (typeof val === 'number' && audioEL.value) {
    audioEL.value!.volume = val / 100

  }
}
/**
 * 
 * @param val 设定的播放时间，单位秒
 */
function setPlayProgress(val: number) {
  if (typeof val === 'number' && audioEL.value) {
    audioEL.value.currentTime = val
  }
}



/**************************************************
*
*        audio事件处理函数
*
 **************************************************/
function errorSong() {
  if (navigator.onLine) {
    $notify(`歌曲 ${currentSong.value?.name} 播放出错`)
    if (userClickPlayActionType.value === 'prev') prev();
    else continuePlay()
  } else {
    $notify(`网络异常,请检查网络`)
  }

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
  // console.log('endedSong')
  continuePlay()
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



</script>

<template>
  <audio v-if="currentSong" ref="audioEL" preload="auto" @canplay="canplaySong" @playing="playSong" @ended="endedSong"
    @play="setPauseState(false)" @pause="setPauseState(true)" @error="errorSong" @timeupdate="updateSongTime"
    :src="currentSong.audioUrl"></audio>
</template>

<style scoped></style>
