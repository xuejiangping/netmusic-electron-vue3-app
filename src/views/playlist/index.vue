<script setup lang="ts">
import get_recom_playlist from '../../assets/js/index/hot_playlist'
const { $utils } = getCurrentInstance()!.appContext.config.globalProperties
const { playlist_info, more, choosePlayListType } = get_recom_playlist({ limit: 5, offset: 0, cat: '为您推荐' })
const formatedData = computed(() => $utils.formatList('playlist', playlist_info.playlist_list, 'large'))
const currentIndex = ref(-1) //标签：为您推荐
watch(currentIndex, choosePlayListType)

</script>

<template>
  <!-- <RouterView></RouterView> -->
  <div>
    <header>
      <div> <el-tag round>全部</el-tag></div>
      <el-scrollbar>
        <div class="hotTags">
          <el-check-tag v-for="(tag, i) in playlist_info.playlist_hot_tags" type="info" :checked="currentIndex === i"
            @click="currentIndex = i" :key="i" effect="light">
            {{ tag.name }}
          </el-check-tag>
        </div>
      </el-scrollbar>
    </header>
    <div class="container" v-my-infinite-scroll="() => more">
      <VideoTable type='playlist' :data-list="formatedData"></VideoTable>
    </div>
  </div>
</template>

<style scoped lang="less">
header {
  display: grid;
  grid-template-columns: 100px 1fr;
  margin: 2rem 0;

  .hotTags {
    display: flex;

    >* {
      font-weight: normal;
    }
  }


}
</style>
