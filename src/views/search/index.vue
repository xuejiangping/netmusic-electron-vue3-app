<script setup lang="tsx">

const $http = getCurrentInstance()?.appContext.config.globalProperties.$http
const $utils = getCurrentInstance()?.appContext.config.globalProperties.$utils


const route = useRoute()
const keyword = computed(() => route.query.keyword)


defineProps<{ text?: string }>()
const activeName = ref(1)
const tagInfo = {
  '单曲': 1,
  '歌手': 2,
  '专辑': 3,
  '视频': 4,
  '歌单': 5
}
//标签页切换，选择搜索类型
const handleChange = console.log



const test = console.log

const songSDataList = ref<SongRecord[]>()
$http?.cloudsearch({ keywords: '许嵩素颜', limit: 5, offset: 2 }).then(res => {
  const { songs } = res.result
  const val = $utils?.formatSongs(songs)
  songSDataList.value = val

  // console.log('songSData', songSDataList)
})


</script>

<template>
  <div class="search">

    <h3 class="title">搜索 <span>{{ keyword }}</span></h3>
    <el-tabs class="tabs" v-model="activeName" @tab-change="handleChange">
      <el-tab-pane v-for="(val, key) in tagInfo" :key="val" :label="key" :name="val"></el-tab-pane>
    </el-tabs>
    <SongTable v-if="songSDataList" :songDataList="songSDataList" @play="test" />

  </div>
</template>

<style scoped lang="less">
.search {
  .title {
    padding: 0.6rem 0;
  }

  .tabs {
    &:deep(.el-tabs__item) {
      font-size: 1rem;
    }
  }


}
</style>
