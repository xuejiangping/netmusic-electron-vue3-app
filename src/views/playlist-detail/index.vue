<script setup lang="ts">
import SongTable from '../../components/SongTable.vue'
import Comment from '../../components/Comment.vue'
const { $http, $utils, $utils2 } = getCurrentInstance()?.proxy!
const { id } = useRoute().query as any

const songTabeNeedShowItems = ['index', 'title', 'singer', 'album', 'duration']
const tagInfoEnum = {
  歌曲列表: { index: 0, suffix: '' },
  评论: { index: 1, suffix: '' }
}
const { tracks, playlist, commentData } = toRefs(reactive({
  tracks: [] as SongItem[],
  playlist: {} as PlaylistItem,
  commentData: {}
}))


const currentComponent = shallowRef<any>(SongTable)


const tastA = $http.playlistdetail({ id }).then(res => {
  playlist.value = $utils.formatList('playlist', [res.playlist], 'middle')[0]
  tracks.value = $utils.formatList('songlist', res.playlist.tracks)
})
const tastB = $http.playlistComment({ id: String(id) }).then(({
  comments, total, hotComments
}) => {
  commentData.value = { comments, total, hotComments }
  tagInfoEnum.评论.suffix = `(${total})`
})
$utils2.loading([tastA, tastB])

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
  <!-- <div>playlist-detail</div> -->
  <div v-if="playlist.cover">
    <detail-template :tag-info-enum="tagInfoEnum" type="歌单" :cover="playlist.cover"
      @handle-tabs-change="handleTabsChange">
      <template #info-line-1> {{ playlist.name }}</template>
      <template #info-line-2>
        <PlayAllBtn :songs="tracks" :list-id="String(playlist.id)"></PlayAllBtn>
      </template>

      <template #info-line-3>
        <RouterLink :to="{ name: 'index', query: { name: playlist.artistName, id: playlist.artistId } }">
          <el-avatar size="small" style="vertical-align: middle" :src="playlist.avatar"></el-avatar>
          &nbsp;<span>{{ playlist.artistName }}</span>
        </RouterLink>
        <span>{{ $utils.formartDate(playlist.createTime) }}</span>

      </template>
      <template #info-line-4>
        <span> 歌曲：{{ $utils.formartNum(playlist.trackCount) }}</span>
        <span> 播放量：{{ $utils.formartNum(playlist.playCount) }}</span>
      </template>
      <template #info-line-5>
        <span class="desc ">简介：{{ playlist.description }}</span>
      </template>
      <KeepAlive>
        <component :listId="id" :need-show-items="songTabeNeedShowItems" :commentData="commentData" :is="currentComponent"
          :data-list="(tracks as any[])">
        </component>
      </KeepAlive>
    </detail-template>
  </div>
</template>

<style scoped lang="less"></style>