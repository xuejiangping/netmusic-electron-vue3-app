<!--  -->
<script setup lang="ts">
// import usePlayStateStore from '../store/play_state_store'
// const { updatePlayList } = usePlayStateStore()
const { $http, $utils } = getCurrentInstance()?.proxy!
const props = defineProps<{
  dataList: any[],
  isAlbum?: boolean
}>()
watchEffect(() => {
  props.dataList.forEach(list => {
    $http.listTracks({ id: list.id, limit: 10 }).then(res => {
      list.tracks = $utils.formatList('songlist', res.songs)
    })
  })
})


</script>

<template>
  <div v-if="dataList" v-for="({ cover, name, tracks, id }) in dataList" class="item">
    <div class="l">
      <MyImage @click="$router.push({
        name: 'album', query: { name, id }
      })" aspect-ratio="1/1" :src="cover" :is-album="isAlbum"></MyImage>
    </div>
    <div class="r">
      <h3 class="title">
        <slot name="title"><span>{{ name }}</span> <span>播放</span></slot>
      </h3>
      <SongTable v-if="tracks" :list-id="id" size="small" :show-header="false"
        :need-show-items="['index', 'title', 'duration', 'pop']" :data-list="tracks">
      </SongTable>
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  display: flex;
  margin-bottom: 2rem;
  column-gap: 3rem;

  .l {
    width: 20%;
  }

  .r {
    flex: 1;

    .title {
      margin: 1rem 0;
    }
  }
}
</style>
