<script setup lang="tsx">
import MixedTable from '../../components/MixedTable.vue'
import VideoTable from '../../components/VideoTable.vue'
type SingerDetai = { briefDesc: string, introduction: { ti: string, txt: string }[] }

const { id, name } = useRoute().query as { id: string, cover: string, name: string }
const { $http, $utils, $utils2 } = getCurrentInstance()?.proxy!
const LIMIT = 3
const tabs = { 专辑: { index: 0 }, MV: { index: 1 }, 歌手详情: { index: 2 }, 相似歌手: { index: 3 } }

const { singerDetai, tabIndex, aritst, hotAlbums, mvs } = toRefs(reactive({
  aritst: {} as SingerItem,
  hotAlbums: [] as AlbumItem[],
  datalist: [],
  mvs: [] as MvItem[],
  tabIndex: 0,
  singerDetai: {} as SingerDetai
}))
const taskA = $http.artistAlbum({ id, limit: LIMIT }).then(res => aritst.value = $utils.formatList('singerlist', [res.artist], 'middle')[0])
$http.artistDesc({ id }).then(({ briefDesc, introduction }) => singerDetai.value = { briefDesc, introduction })
$utils2.loading([taskA])

const [getMoreArtistAlbum, getMoreArtistMv] = [$http.artistAlbum, $http.artistMv].map((item) => $utils2.getMoreHandler(item, 500, 1))
function moreAlbum() {
  getMoreArtistAlbum({ id, limit: LIMIT }).then(res => hotAlbums.value.push(...$utils.formatList('albumlist', res.hotAlbums, 'middle')))
}
function moreVideo() {
  getMoreArtistMv({ id, limit: LIMIT }).then(res => mvs.value.push(...$utils.formatList('mvlist', res.mvs, 'middle')))
}
moreVideo()
moreAlbum()

const more = () => {
  if (tabIndex.value === tabs.专辑.index) return moreAlbum
  else if (tabIndex.value === tabs.MV.index) return moreVideo
  else return () => 0
}

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
          <MixedTable v-if="tabIndex === tabs.专辑.index" is-album :data-list="hotAlbums">
          </MixedTable>
          <VideoTable v-else-if="tabIndex === tabs.MV.index" route-name="mv-detail" :data-list="mvs">
          </VideoTable>
          <div v-show="tabIndex === tabs.歌手详情.index" class="detail">
            <h3 class="">{{ aritst.name }}的简介</h3>
            <p>{{ singerDetai.briefDesc }}</p>
            <div class="introduction" v-for="({ txt, ti }) in singerDetai.introduction">
              <h4>{{ ti }}</h4>
              <p v-for="(item) in txt.split(/(?=●)/)">{{ item }}</p>
            </div>
          </div>
          <VideoTable v-show="tabIndex === tabs.相似歌手.index" :data-list="[]"></VideoTable>

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
