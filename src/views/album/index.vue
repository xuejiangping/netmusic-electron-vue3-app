<script setup lang="ts">
import SongTable from '../../components/SongTable.vue'
import Comment from '../../components/Comment.vue'


const { id } = useRoute().query as any
const { $http, $utils, $utils2 } = getCurrentInstance()?.proxy!
interface AlbumInfo {
  album: null | AlbumItem,
  songs: SongItem[],
}
const songTableneedShowItmes = ['index', 'title', 'singer', 'duration']

const state = reactive<AlbumInfo>({
  album: null, songs: []
})
const { album, songs } = toRefs(state)

const tastA = $http.album({ id }).then(({ songs, album }) => {
  state.album = $utils.formatList('albumlist', [album], 'middle')[0]
  state.songs = $utils.formatList('songlist', songs)
})


$utils2.loading([tastA])

const tagInfoEnum = {
  歌曲列表: { index: 0, suffix: '' },
  评论: { index: 1, suffix: '' }
}
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
    :cover="album.cover">
    <template #info-line-1> <span>{{ album.name }}</span> </template>
    <template #info-line-2>
      <PlayAllBtn :songs="songs" :listId="String(album.id)"></PlayAllBtn>
    </template>
    <template #info-line-3>
      <span>歌手：<RouterLink v-for="({ name, id }, i) in album?.artists" :to="{ name: 'singer', query: { name, id } }"
          v-split="[i]">
          {{ name }}
        </RouterLink></span>
    </template>
    <template #info-line-4>
      <span>时间：{{ album?.publishTime }}</span>
    </template>

    <template #info-line-5>
      <span v-if="album.description">简介：{{ album.description }}</span>
    </template>
    <KeepAlive>
      <component :listId="id" :need-show-items="songTableneedShowItmes" type="专辑" :info="{ id, name: album.name }"
        :is="currentComponent" :data-list="(songs as any[])">
      </component>
    </KeepAlive>
  </DetailTemplate>
</template>

<style scoped lang="less"></style>
