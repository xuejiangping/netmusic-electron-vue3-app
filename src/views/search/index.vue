<script setup lang="ts">
import SongTable from '../../components/SongTable.vue'


const { $http, $utils, $COMMON } = (getCurrentInstance() as ComponentInternalInstance).appContext.config.globalProperties

const tagInfo = $COMMON.SEARCH_TYPE

const components_path = ['@/components/SongTable.vue']
console.log('components_path', components_path)

let a = import.meta.glob(['@/components/SongTable.vue'], {})
console.log('a', a)
const route = useRoute()
const keyword = computed(() => route.query.keyword)



defineProps<{ text?: string }>()
const activeName = ref(1)


//标签页切换，选择搜索类型
const handleTabsChange = console.log

watch(keyword, (newVal) => {
  $http?.cloudsearch({ keywords: String(newVal), limit: 5, offset: 2 }).then(res => {
    const { songs } = res.result
    const val = $utils?.formatSongs(songs)
    songSDataList.value = val
  })
}, { immediate: true })


// const test = console.log

const songSDataList = ref<SongRecord[]>()


</script>

<template>
  <div class="search">

    <h3 class="title">搜索 <span>{{ keyword }}</span></h3>
    <el-tabs class="tabs" v-model="activeName" @tab-change="handleTabsChange">
      <el-tab-pane v-for="(item, index) in tagInfo" :key="index" :label="item?.label" :name="item?.val"></el-tab-pane>
    </el-tabs>
    <component :is="SongTable" :songDataList="songSDataList"></component>
    <!-- <SongTable v-if="songSDataList" :songDataList="songSDataList" @play="test" /> -->

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
