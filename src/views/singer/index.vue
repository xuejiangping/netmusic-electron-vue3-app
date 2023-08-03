<script setup lang="tsx">
import MixedTable from '../../components/MixedTable.vue'
import VideoTable from '../../components/VideoTable.vue'
type SingerDetai = { briefDesc: string, introduction: { ti: string, txt: string }[] }

const route = useRoute()
const id = computed(() => (route.query as { id: string, name: string }).id)
const name = computed(() => (route.query as { id: string, name: string }).name)

// watchEffect(() => query.id)
// console.log('query', query)

const { $http, $utils, $utils2, $store } = getCurrentInstance()?.proxy!
const LIMIT = 3
const tabs = { 专辑: { index: 0 }, MV: { index: 1 }, 歌手详情: { index: 2 }, 相似歌手: { index: 3 } }

const { cookie } = storeToRefs($store.userLoginStore())
const { singerDetai, tabIndex, aritst, hotAlbums, mvs, simiAtrist } = toRefs(reactive({
  aritst: {} as SingerItem,
  hotAlbums: [] as AlbumItem[],
  datalist: [],
  mvs: [] as MvItem[],
  tabIndex: 0,
  singerDetai: {} as SingerDetai,
  simiAtrist: [] as any[]
}))



const [getMoreArtistAlbum, getMoreArtistMv] = [$http.artistAlbum, $http.artistMv].map((fn) => $utils2.getMoreHandler(fn, 500))
function moreAlbum() {
  getMoreArtistAlbum({ id: id.value, limit: LIMIT }).then(res => hotAlbums.value.push(...$utils.formatList('albumlist', res.hotAlbums, 'middle')))
}
function moreVideo() {
  getMoreArtistMv({ id: id.value, limit: LIMIT }).then(res => mvs.value.push(...$utils.formatList('mvlist', res.mvs, 'middle')))
}
function getSimiAtrist() {
  $http.simiAtrist({ id: id.value, cookie: cookie.value }).then(res => simiAtrist.value = $utils.formatList('singerlist', res.artists, 'middle'))
}

const more = () => {
  if (tabIndex.value === tabs.专辑.index) return moreAlbum
  else if (tabIndex.value === tabs.MV.index) return moreVideo
  else return () => 0
}

watchEffect(() => {
  const taskA = $http.artistAlbum({ id: id.value, limit: LIMIT }).then(res => aritst.value = $utils.formatList('singerlist', [res.artist], 'middle')[0])
  $http.artistDesc({ id: id.value }).then(({ briefDesc, introduction }) => singerDetai.value = { briefDesc, introduction })
  moreVideo()
  moreAlbum()
  getSimiAtrist()
  $utils2.loading([taskA])
})


</script>

<template>
  <div v-if="aritst">
    <DetailTemplate :cover="aritst.cover" :tag-info-enum="tabs" type="歌手" @handle-tabs-change="i => tabIndex = i">
      <template #info-line-1><span>{{ name }}</span></template>

      <template #info-line-3><span> 单曲数：{{ aritst.musicSize }}</span>
        <span>专辑数：{{ aritst.albumSize }}</span> <span>MV数:{{ }}</span></template>
      <template #info-line-5><span>{{ singerDetai.briefDesc }}</span></template>
      <KeepAlive>
        <div v-my-infinite-scroll="more">
          <MixedTable v-if="tabIndex === tabs.专辑.index" type='album' :data-list="hotAlbums">
          </MixedTable>
          <VideoTable v-else-if="tabIndex === tabs.MV.index" type='video' :data-list="mvs">
          </VideoTable>
          <div v-show="tabIndex === tabs.歌手详情.index" class="detail">
            <h3 class="">{{ aritst.name }}的简介</h3>
            <p>{{ singerDetai.briefDesc }}</p>
            <div class="introduction" v-for="({ txt, ti }) in singerDetai.introduction">
              <h4>{{ ti }}</h4>
              <p v-for="(item) in txt.split(/(?=(●|\n))/)">{{ item }}</p>
            </div>
          </div>
          <VideoTable v-show="tabIndex === tabs.相似歌手.index" type='singer' :data-list="simiAtrist"></VideoTable>

        </div>
      </KeepAlive>
    </DetailTemplate>
  </div>
</template>
<style scoped lang="less">
.detail {
  line-height: 2em;

  p {
    text-indent: 2em;
  }

  .introduction {
    margin: 1rem 0;
  }
}
</style>
