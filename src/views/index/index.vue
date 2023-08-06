<script setup lang="ts">
const { $http, $router, $utils, $utils2, $store } = getCurrentInstance()?.proxy!
const { addSong } = $store.usePlayStateStore()

const { recoMV, banners, topSong, dujiafangsong, personalizedPlaylist, carousel_height, carousel } = toRefs(reactive({
  banners: [{
    imageUrl: '',
    targetType: 10,
    titleColor: "red",
    targetId: '',
    typeTitle: "新碟首发" as '新碟首发' | '歌单' | '新歌首发' | '歌单推荐'
  }],
  carousel: {} as HTMLElement,
  carousel_height: 200,
  personalizedPlaylist: [] as PlaylistItem[],
  dujiafangsong: [] as any[],
  topSong: [] as SongItem[],
  recoMV: [] as MvItem[]
}))
/***********************请求*************************/
const taskA = $http.getBanner().then(res => banners.value = res.banners)
const taskB = $http.personalized(10).then(res => personalizedPlaylist.value = $utils.formatList('playlist', res.result, 'middle'))

$http.dujiafangsong().then(res => dujiafangsong.value = $utils.formatList('videolist', res.result, 'middle'))
$http.topSong().then(res => topSong.value = $utils.formatList('songlist', res.data.slice(0, 12)))
$http.recoMV().then(res => recoMV.value = $utils.formatList('mvlist', res.result, 'middle'))
$utils2.loading([taskA, taskB])
const ASPECT_RATIO = 16 / 7
function setCarouselHeigh() {
  carousel_height.value = carousel.value.clientWidth / 2 / ASPECT_RATIO + 30
}

function bannerClick(banner: typeof banners.value['0']) {

  switch (banner.typeTitle) {
    case '新歌首发':
      $http.songDetail({ ids: banner.targetId })
        .then(res => $utils.formatList('songlist', res.songs))
        .then(songs => addSong(songs[0], true))
      break;
    case '新碟首发':
      $http.album({ id: banner.targetId }).then(console.log)
      $router.push({ name: 'album', query: { name: '', id: banner.targetId } })
      break;
    case '歌单':
    case '歌单推荐':
      $router.push({ name: 'playlist-detail', query: { name: '', id: banner.targetId } })
      break;
  }

}



onMounted(() => {
  setCarouselHeigh()
  window.addEventListener('resize', setCarouselHeigh)


})
onUnmounted(() => window.removeEventListener('resize', setCarouselHeigh))




</script>

<template>
  <div>
    <!-- <Icons></Icons> -->

    <section ref="carousel">
      <el-carousel class="carousel" type="card" :interval="4000" :height="carousel_height + 'px'">
        <el-carousel-item label="⭕" v-for="banner in banners">
          <div class="carousel-item" @click="bannerClick(banner)">
            <MyImage :aspect-ratio="String(ASPECT_RATIO)" :lazy="false" :src="banner.imageUrl"></MyImage>
            <span class="lable" :style="{ backgroundColor: banner.titleColor }">{{ banner.typeTitle }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section>
      <h3><el-link @click="$router.push('playlist')">推荐歌单 <i class="iconfont icon-arrow"> </i></el-link> </h3>

      <VideoTable type='playlist' :data-list="personalizedPlaylist"></VideoTable>
    </section>
    <section>
      <h3><el-link>独家放送 <i class="iconfont icon-arrow"> </i></el-link> </h3>
      <VideoTable aspect_ratio="16/8" type='video' :data-list="dujiafangsong"></VideoTable>
    </section>
    <section>
      <h3><el-link>最新音乐 <i class="iconfont icon-arrow"> </i></el-link> </h3>
      <ul class="musiclist">
        <ListItem type="song" v-for="(song) in topSong" :img1v1-url="song.album.cover"
          @icon_play_click_handler="addSong(song, true)" @dblclick="addSong(song, true)">
          <div class="musiclist-info">
            <div v-title>{{ song.name }}</div>
            <div v-title>
              <RouterLink v-for="(artist, i) in song.artists" v-split="[i]"
                :to="{ name: 'singer', query: { name: artist.name, id: artist.id } }">
                {{ artist.name }}
              </RouterLink>
            </div>
          </div>
        </ListItem>

      </ul>
    </section>
    <section>
      <h3><el-link>推荐MV <i class="iconfont icon-arrow"> </i> </el-link></h3>
      <VideoTable aspect_ratio="16/8" type='video' :data-list="recoMV"></VideoTable>
    </section>
  </div>
</template>

<style scoped lang="less">
.carousel {
  &:deep(.el-carousel__indicators--labels .el-carousel__button) {
    padding: 0;
    font-size: 0.5rem;
  }
}

.carousel-item {
  // height: 400px;
  border-radius: 8px;
  position: relative;

  .lable {
    position: absolute;
    right: 0;
    bottom: 2px;
    padding: 0.2rem 0.3rem;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    color: #fff;
    z-index: 1;


  }
}

section h3 {
  margin: 1rem 0;

  .iconfont {
    display: inline-block;
    transform: rotate(-90deg)
  }
}

.musiclist {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .musiclist-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 0.8rem;
  }
}
</style>
