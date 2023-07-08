<script setup lang="ts">
import SongTable from '@components/SongTable.vue'
import SingerTable from '@components/SingerTable.vue'
import VideoTable from '@components/VideoTable.vue'
import AlbumTable from '@components/AlbumTable.vue'
import PalylistTable from '@components/PlaylistTable.vue'
import { useSearchPanelStore } from '../../store/search-panel-store'

/************************************************/
const store = useSearchPanelStore()
const { dataListInfo } = storeToRefs(store)
const { setLastActiveIndex, lastActiveIndex, setLastKeyword, resetDataListInfo, setDataListInfo, lastKeyword } = store
const { $http, $COMMON, $utils } = getCurrentInstance()!.appContext.config.globalProperties
const PAGE_LIMIT = 5
/** tags 和 搜索类型的枚举 */
const tagInfoEnum = $COMMON.SEARCH_TYPE_ENUM
const route = useRoute()
const keyword = computed(() => route.query.keyword)

const currentPage = ref(1)  //分页器当前页码
const isloading = ref(false)
// useSearchPanelStore()


//activeIndex 由pinai 状态维护，tab标签组件需要一个v-model prop ,所以维护一个中间变量 activeIndex
const activeIndex = ref(lastActiveIndex || tagInfoEnum.单曲)


type TagInfoEnumValue = GetValue<typeof tagInfoEnum>

const TAB_OPTONS: Record<TagInfoEnumValue, [Component, string, string]> = {
  [tagInfoEnum.单曲]: [SongTable, 'songs', 'songCount'],
  [tagInfoEnum.歌手]: [SingerTable, 'artists', 'artistCount'],
  [tagInfoEnum.视频]: [VideoTable, 'mvs', 'mvCount'],
  [tagInfoEnum.专辑]: [AlbumTable, 'albums', 'albumCount'],
  [tagInfoEnum.歌单]: [PalylistTable, 'playlists', 'playlistCount'],
}


//路由跳转时储存keyword 和 tab标签的active状态
onBeforeRouteLeave(() => {
  setLastActiveIndex(activeIndex.value)
  setLastKeyword(String(keyword.value))

})

//标签页切换，选择搜索类型
const handleTabsChange = () => {

  //缓存了数据，若tab标签一样，不需要请求数据
  if (dataListInfo.value[activeIndex.value].data === null) {
    updateDataList()
  }
}

const updateDataList = async (isPagination = false) => {
  isloading.value = true
  const type = unref(activeIndex)
  const offset = (currentPage.value - 1) * PAGE_LIMIT  // 分页参数：（currentPage-1）*limit
  const { result } = await $http.cloudsearch({ keywords: String(keyword.value), limit: PAGE_LIMIT, offset, type: String(type) })
  isloading.value = false
  const countKey = TAB_OPTONS[type][2]
  const dataKey = TAB_OPTONS[type][1]

  let data = result[dataKey]
  let count = result[countKey]

  if (isPagination) { //若分页请求，不更新总数count 
    setDataListInfo(activeIndex.value, { data })
  } else {
    setDataListInfo(activeIndex.value, { data, count })
    // console.log('data', data)
  }

  // console.log('dataListInfo', dataListInfo)
}



// console.time('测试路由缓存')


watch(keyword, (newVal) => {
  // 观察关键词，只有变化了请求数据
  if (newVal === lastKeyword) return
  resetDataListInfo()
  updateDataList()
}, { immediate: true })

watch(currentPage, () => updateDataList(true))

const dataList = computed(() => {
  const rawDataList = dataListInfo.value[activeIndex.value].data
  if (rawDataList === null) return []
  let formatedDataList
  switch (activeIndex.value) {
    case tagInfoEnum.单曲:
      formatedDataList = $utils.formatSongs(rawDataList)
      break;
    case tagInfoEnum.专辑:
      formatedDataList = $utils.formatAlbumlist(rawDataList)
      break;
    case tagInfoEnum.歌手:
      formatedDataList = $utils.formatSingerlist(rawDataList)
      break;
    case tagInfoEnum.歌单:
      formatedDataList = $utils.formatPlaylist(rawDataList)
      break;
    case tagInfoEnum.视频:
      formatedDataList = $utils.formatVideolist(rawDataList)
      break;
  }
  return formatedDataList
})


</script>

<template>
  <div class="search">
    <!-- HTML 中的 kebab-case -->
    <h3 class="title">搜索 <span>{{ keyword }}</span></h3>
    <div class="search-count"><span>搜索结果{{ dataListInfo[activeIndex].count }}</span></div>
    <el-tabs class="tabs" v-model="activeIndex" @tab-change="handleTabsChange">
      <el-tab-pane v-for="(type, label) in tagInfoEnum" :key="type" :label="label" :name="type"></el-tab-pane>
    </el-tabs>

    <loading v-show="isloading" />
    <keep-alive v-show="!isloading">
      <component :is="TAB_OPTONS[activeIndex][0]" routeName="mv-detail" :dataList="dataList">
      </component>
    </keep-alive>
    <!-- <SongTable v-if="songSDataList" :songDataList="songSDataList" @play="test" /> -->
    <div class="pagination">
      <el-pagination small hide-on-single-page v-model:current-page="currentPage" background layout="prev, pager, next"
        :page-size="PAGE_LIMIT" :total="dataListInfo[activeIndex].count" />
    </div>
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

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    font-size: 2rem;
  }
}
</style>
