<script setup lang="ts">
import get_recom_playlist from '../../assets/js/index/hot_recom'


const { playlist_info, getHotTags, choosePlayListType } = get_recom_playlist({ limit: 10, offset: 1, cat: '为您推荐' })

const hotTags = computed(() => playlist_info.playlist_tags)
setTimeout(() => {
  // console.log('formatedData', formatedData)
  // console.log('hotTags', hotTags)
  // console.log('playlist_info', playlist_info)
  // console.log(playlist_info.playlist_loading)

}, 2000);



const formatedData = computed(() => {
  return playlist_info.playlist_list.map((raw) => {
    const { coverImgUrl, name, playCount, creator: { nickname, userId } } = raw
    return {
      cover: coverImgUrl, name, playCount, artistName: nickname, artistId: userId, raw
    }
  })
})

</script>

<template>
  <header>
    <div> <el-tag round>全部</el-tag></div>

    <div class="hotTags">
      <el-tag v-for="(tag, i) in hotTags" type="info" :key="i" effect="light">
        {{ tag.name }}
      </el-tag>
    </div>
  </header>
  <Loading v-if="playlist_info.playlist_loading"></Loading>
  <div class="container">
    <VideoTable :data-list="formatedData"></VideoTable>
  </div>
</template>

<style scoped lang="less">
header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 1rem 0;

  .hotTags {

    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 5px;
  }

}
</style>
