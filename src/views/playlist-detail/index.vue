<script setup lang="ts">
import SongTable from '../../components/SongTable.vue'
import Comment from '../../components/Comment.vue'

const { $http, $utils, $COMMON } = getCurrentInstance()!.appContext.config.globalProperties
const { id, name } = useRoute().query as any
// const { id, cover, name } = query
const playListDetail = ref()
const loading = ref(true)
const tagInfoEnum = {
  歌曲列表: { index: 0, suffix: '' },
  评论: { index: 1, suffix: '' }
}

const commentData = ref()

const dataList = computed(() => $utils.formatSongs(playListDetail.value.tracks))

onMounted(() => {
  $http.playlistdetail({ id }).then(res => {
    // console.log('res', res)
    playListDetail.value = res.playlist
    loading.value = false
    // console.log('playListDetail', playListDetail)
  })
  $http.playlistComment({ id: String(id) }).then(({
    comments, total, hotComments
  }) => {
    commentData.value = { comments, total, hotComments }
    tagInfoEnum.评论.suffix = `(${total})`
  })

})
const currentComponent = shallowRef<any>(SongTable)

const cover = computed(() => playListDetail.value.coverImgUrl + $COMMON.IMG_SIZE_SEARCH_PARAMS.squar.middle)
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
  <Loading v-if="loading"></Loading>
  <div v-if="!loading">
    <detail-template :tag-info-enum="tagInfoEnum" :cover="cover" @handle-tabs-change="handleTabsChange">
      <!-- 1231 -->
      <template #info-line-1>
        {{ name }}
      </template>
      <template #info-line-3>
        <RouterLink
          :to="{ name: 'singer', query: { name: playListDetail.creator.nickname, id: playListDetail.creator.userId } }">
          <el-avatar size="small" style="vertical-align: middle" :src="playListDetail.creator.avatarUrl"></el-avatar>
          &nbsp;<span>{{ playListDetail.creator.nickname }}</span>
        </RouterLink>
        <span>{{ $utils.formartDate(playListDetail.createTime) }}</span>

      </template>
      <template #info-line-4>
        <span> 歌曲：{{ $utils.formartNum(playListDetail.trackCount) }}</span>
        <span> 播放量：{{ $utils.formartNum(playListDetail.playCount) }}</span>
      </template>
      <template #info-line-5>
        <span class="desc ">简介：{{ playListDetail.description }}</span>
      </template>

      <KeepAlive>
        <component :commentData="commentData" v-show="!loading" :is="currentComponent" :data-list="(dataList as any[])">
        </component>
      </KeepAlive>
    </detail-template>
  </div>
</template>

<style scoped lang="less">
.desc {
  color: var(--color-text);
}
</style>