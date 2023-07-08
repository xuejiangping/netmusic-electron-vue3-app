<script setup lang="ts">
import get_recom_playlist from '../../assets/js/index/hot_recom'

const { $utils } = getCurrentInstance()!.appContext.config.globalProperties
const { playlist_info, getMore, choosePlayListType } = get_recom_playlist({ limit: 5, offset: 0, cat: '为您推荐' })

// const hotTags = computed(() => playlist_info.playlist_hot_tags)
const isloading = computed(() => playlist_info.playlist_loading)
// setTimeout(() => {
//   console.log('formatedData', formatedData)
//   console.log('hotTags', hotTags)
//   console.log('playlist_info', playlist_info)
//   console.log(playlist_info.playlist_loading)

// }, 2000);
console.log('playlist_info', playlist_info)


const formatedData = computed(() => {
  // return $utils.formatPlaylist(playlist_info.playlist_list)
  return playlist_info.playlist_list.map((raw) => {
    const { coverImgUrl, name, playCount, id, creator: { nickname, userId } } = raw
    return {
      cover: coverImgUrl, name, playCount: $utils.formartNum(playCount), id, artistName: nickname, artistId: userId
    }
  })
})

const debounced_getmore = $utils.debounce(() => { getMore().then(() => console.log(playlist_info)); console.count('debounce') }, 2000)

const load = () => {
  console.count('load')
  debounced_getmore()
  // getMore().then(() => console.log(playlist_info))
}

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
            @click="() => currentIndex = i" :key="i" effect="light">
            {{ tag.name }}
          </el-check-tag>
        </div>
      </el-scrollbar>

    </header>

    <div class="container" v-infinite-scroll="load">
      <VideoTable route-name="playlist-detail" squar :data-list="formatedData"></VideoTable>
    </div>
    <Loading v-if="isloading"></Loading>
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
