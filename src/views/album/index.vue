<script setup lang="ts">
import SongTable from '../../components/SongTable.vue'
import Comment from '../../components/Comment.vue'
const { id, name } = useRoute().query as any
const { $http, $utils } = getCurrentInstance()?.appContext.config.globalProperties!
interface AlbumInfo {
  album: null | ReturnType<typeof $utils.formatAlbumlist>[0],
  songs: null | ReturnType<typeof $utils.formatSongs>
}
const state = reactive<AlbumInfo>({
  album: null, songs: null
})
const { album, songs } = toRefs(state)
$http.album({ id }).then(({ songs, album }) => {
  state.album = $utils.formatAlbumlist([album], 'middle')[0]
  state.songs = $utils.formatSongs(songs)
  // console.log('$utils.formatAlbumlist([album])', $utils.formatAlbumlist([album]))
})


$http.albumComment({ id: String(id) }).then(({
  comments, total, hotComments
}) => {
  commentData.value = { comments, total, hotComments }
  tagInfoEnum.评论.suffix = `(${total})`
})
const tagInfoEnum = {
  歌曲列表: { index: 0, suffix: '' },
  评论: { index: 1, suffix: '' }
}
const commentData = ref()
const currentComponent = shallowRef<any>(SongTable)

const handleTabsChange = (index: number) => {
  console.log('index', index)
  if (index === tagInfoEnum.歌曲列表.index) {
    currentComponent.value = SongTable
  } else if (index === tagInfoEnum.评论.index) {
    currentComponent.value = Comment
  }
}

</script>

<template>
  <DetailTemplate v-if="album" type="专辑" @handle-tabs-change="handleTabsChange" :tag-info-enum="tagInfoEnum"
    :cover="album?.img1v1Url">
    <template #info-line-1>
      <span>{{ name }}</span>
    </template>
    <template #info-line-3>
      <span>歌手：<RouterLink v-for="({ name, id }, i) in album?.artists" :to="{ name: 'index', query: { name, id } }"
          v-split="[i]">
          {{ name }}
        </RouterLink></span>
    </template>
    <template #info-line-4>
      <span>时间：{{ album?.publishTime }}</span>
    </template>

    <template #info-line-5>
      <span v-if="album?.description">简介：{{ album?.description }}</span>
    </template>


    <!-- <SongTable v-if="songs" :data-list="songs"></SongTable> -->
    <KeepAlive>
      <component :listId="id" :commentData="commentData" :is="currentComponent" :data-list="(songs as any[])">
      </component>
    </KeepAlive>
  </DetailTemplate>
</template>

<style scoped lang="less"></style>
