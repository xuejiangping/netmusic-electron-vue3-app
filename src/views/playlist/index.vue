<script setup lang="ts">
import get_recom_playlist from '../../assets/js/index/hot_recom'

const { debounce } = getCurrentInstance()!.appContext.config.globalProperties.$utils
const { playlist_info, getMore, getHotTags, choosePlayListType } = get_recom_playlist({ limit: 5, offset: 0, cat: '为您推荐' })

const hotTags = computed(() => playlist_info.playlist_tags)
// setTimeout(() => {
//   console.log('formatedData', formatedData)
//   console.log('hotTags', hotTags)
//   console.log('playlist_info', playlist_info)
//   console.log(playlist_info.playlist_loading)

// }, 2000);



const formatedData = computed(() => {
  return playlist_info.playlist_list.map((raw) => {
    const { coverImgUrl, name, playCount, creator: { nickname, userId } } = raw
    return {
      cover: coverImgUrl, name, playCount, artistName: nickname, artistId: userId, raw
    }
  })
})

const debounced_getmore = debounce(() => { getMore().then(() => console.log(playlist_info)); console.count('debounce') })

const load = () => {
  console.count('load')
  debounced_getmore()
  // getMore().then(() => console.log(playlist_info))
}
</script>

<template>
  <!-- <RouterView></RouterView> -->
  <header>
    <div> <el-tag round>全部</el-tag></div>

    <el-scrollbar noresize>
      <div class="hotTags">
        <el-check-tag v-for="(tag, i) in hotTags" type="info" :key="i" effect="light">
          {{ tag.name }}
        </el-check-tag>
      </div>
    </el-scrollbar>

  </header>
  <Loading v-if="playlist_info.playlist_loading"></Loading>
  <div class="container" v-infinite-scroll="load">
    <VideoTable route-name="playlist-detail" squar :data-list="formatedData"></VideoTable>
  </div>
</template>

<style scoped lang="less">
header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 1rem 0;

  .hotTags {
    display: flex;
  }

}
</style>
