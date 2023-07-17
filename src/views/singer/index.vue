<script setup lang="ts">
import MixedTable from '../../components/MixedTable.vue'
const { id, name } = useRoute().query as { id: string, cover: string, name: string }
const { $http, $utils, $utils2 } = getCurrentInstance()?.proxy!
const LIMIT = 5
const tabs = { 专辑: { index: 0 }, MV: { index: 1 }, 歌手详情: { index: 2 }, 相似歌手: { index: 3 } }

const { aritst, hotAlbums } = toRefs(reactive({
  aritst: {} as SingerItem,
  hotAlbums: [] as AlbumItem[]
}))
const taskA = $http.artistAlbum({ id, limit: LIMIT }).then(res => {
  aritst.value = $utils.formatList('singerlist', [res.artist], 'middle')[0]
  hotAlbums.value = $utils.formatList('albumlist', res.hotAlbums, 'middle')
})
$utils2.loading([taskA])

function tabsChange() {

}
</script>

<template>
  <div v-if="aritst">
    <DetailTemplate :cover="aritst.cover" :tag-info-enum="tabs" type="歌手" @handle-tabs-change="tabsChange">
      <template #info-line-1><span>{{ name }}</span></template>
      <template #info-line-3><span> 单曲数：{{ aritst.musicSize }}</span>
        <span>专辑数：{{ aritst.albumSize }}</span> <span>MV数:{{ }}</span></template>
      <template><span>{{ name }}</span></template>
      <KeepAlive>
        <component isAlbum :data-list="hotAlbums" :is="MixedTable" :id="id"></component>
      </KeepAlive>
    </DetailTemplate>
  </div>
</template>
<style scoped lang="less"></style>
