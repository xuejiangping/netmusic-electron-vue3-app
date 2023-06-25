<script setup lang="ts">
import SongTable from '@components/SongTable.vue'
import SingerTable from '@components/SingerTable.vue'
import VideoTable from '@components/VideoTable.vue'
import AlbumTable from '@components/AlbumTable.vue'
import PalylistTable from '@components/PlaylistTable.vue'


const { $http, $utils, $COMMON } = (getCurrentInstance() as ComponentInternalInstance).appContext.config.globalProperties
const PAGE_LIMIT = 3
const tagInfo = $COMMON.SEARCH_TYPE
/** tags 和 搜索类型的枚举 */
const tagInfoEnum = $COMMON.SEARCH_TYPE_ENUM


const route = useRoute()
const keyword = computed(() => route.query.keyword)
const resultCount = ref(0)
const page_offset = ref(1)

// 当前标签页类型
const activeName = ref(tagInfoEnum.单曲)


const componentsInfo: Record<number, [Component, string, string]> = {
  [tagInfoEnum.单曲]: [SongTable, 'songs', 'songCount'],
  [tagInfoEnum.歌手]: [SingerTable, 'artists', 'artistCount'],
  [tagInfoEnum.视频]: [VideoTable, 'mvs', 'mvCount'],
  [tagInfoEnum.专辑]: [AlbumTable, 'albums', 'albumCount'],
  [tagInfoEnum.歌单]: [PalylistTable, 'palylists', 'playlistCount'],
}

/** 关于当前搜索词的 数据数组 */
const dataListInfo = shallowReactive<{
  [tagInfoEnum.单曲]: any[] | null,
  [tagInfoEnum.歌手]: any[] | null,
  [tagInfoEnum.视频]: any[] | null,
  [tagInfoEnum.专辑]: any[] | null,
  [tagInfoEnum.歌单]: any[] | null
}>({
  [tagInfoEnum.单曲]: null,
  [tagInfoEnum.歌手]: null,
  [tagInfoEnum.视频]: null,
  [tagInfoEnum.专辑]: null,
  [tagInfoEnum.歌单]: null
})
//@ts-ignore  忽视 for in 循环 报错
const resetDataListInfo = () => { for (let k in dataListInfo) dataListInfo[k] = null }
// const resetDataListInfo = () => dataListInfo=ref({})

//标签页切换，选择搜索类型
const handleTabsChange = () => {
  //缓存了数据，若类型一样，则不需要请求数据
  if (dataListInfo[activeName.value] === null) {
    updateDataList()
  }
}

const updateDataList = () => {
  const type = unref(activeName)
  const offset = unref(page_offset)
  console.log(offset)
  $http.cloudsearch({ keywords: String(keyword.value), limit: PAGE_LIMIT, offset, type: String(type) })
    .then(({ result }) => {
      const countKey = componentsInfo[type][2]
      const dataListKey = componentsInfo[type][1]
      resultCount.value = result[countKey]
      if (activeName.value === tagInfoEnum.单曲) {
        dataListInfo[activeName.value] = $utils?.formatSongs(result[dataListKey])
      } else {
        dataListInfo[activeName.value] = result[dataListKey]
      }
      console.log('dataListInfo', dataListInfo)
    })
}




watch(keyword, () => {
  resetDataListInfo()
  updateDataList()
}, { immediate: true })

watch(page_offset, () => {
  updateDataList()
})
// const play = console.log

// const isloading = ref(false)

</script>

<template>
  <div class="search">
    <!-- HTML 中的 kebab-case -->
    <h3 class="title">搜索 <span>{{ keyword }}</span></h3>
    <div class="search-count"><span>搜索结果{{ resultCount }}</span></div>
    <el-tabs class="tabs" v-model="activeName" @tab-change="handleTabsChange">
      <el-tab-pane v-for="(item, index) in tagInfo" :key="index" :label="item.label" :name="item.val"></el-tab-pane>
    </el-tabs>

    <!-- <loading v-if="isloading" /> -->
    <keep-alive>
      <component :is="componentsInfo[activeName][0]" :dataList="dataListInfo[activeName]"></component>
    </keep-alive>
    <!-- <SongTable v-if="songSDataList" :songDataList="songSDataList" @play="test" /> -->

  </div>
</template>

<style scoped lang="less">
.search {
  .title {
    padding: 0.6rem 0;
  }

  .search-count {
    display: flex;
    justify-content: end;
    color: rgb(153, 153, 206);
  }



  .tabs {
    &:deep(.el-tabs__item) {
      font-size: 1rem;
    }
  }


}
</style>
