<script setup lang="ts">

</script>

<template>
  <audio v-if="curSongInfo" ref="myAudio" preload="auto" @canplay="canplaySong" @playing="playSong" @ended="endedSong"
    @error="errorSong" @timeupdate="updateSongTime" :src="curSongInfo.url"></audio>
</template>

<style scoped></style>
