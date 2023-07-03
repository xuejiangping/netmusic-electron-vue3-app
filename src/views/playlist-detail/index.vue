<script setup lang="ts">

const test = console.log
const { $http } = getCurrentInstance()!.appContext.config.globalProperties
const query: { id: string, cover: string, name: string } = useRoute().query as any
const { id, cover, name } = query
const playListDetail = ref()
const loading = ref(true)

onMounted(() => {
  $http.playlistdetail({ id }).then(res => {
    console.log('res', res)
    playListDetail.value = res.playlist
    loading.value = false
    console.log('playListDetail', playListDetail)
    console.log('playListDetail.tracks', playListDetail.value.tracks)
  })
})



</script>

<template>
  <!-- <div>playlist-detail</div> -->
  <div>
    <detail-template :cover="cover" @handle-tabs-change="test">
      1231
      <template #info-line-1>
        {{ name }}
      </template>
      <template #info-line-2>
        999
      </template>
      <template #info-line-3>
      </template>
      <Loading v-if="loading"></Loading>
      <song-table v-else :data-list="playListDetail.tracks"></song-table>
    </detail-template>
  </div>
</template>

<style scoped lang="less"></style>