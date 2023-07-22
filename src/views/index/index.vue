<script setup lang="ts">
import usePlayStateStore from '../../store/play_state_store'
const { addSong } = usePlayStateStore()
const { $http, $router, $utils } = getCurrentInstance()?.proxy!

const { banners, carousel_height, carousel } = toRefs(reactive({
  banners: [{
    imageUrl: '',
    targetType: 10,
    titleColor: "red",
    targetId: '',
    typeTitle: "新碟首发" as '新碟首发' | '歌单' | '新歌首发' | '歌单推荐'
  }],
  carousel: {} as HTMLElement,
  carousel_height: 200
}))
$http.getBanner().then(res => banners.value = res.banners)

const aspect_ratio = 16 / 6
function setCarouselHeigh() {
  carousel_height.value = carousel.value.clientWidth / aspect_ratio + 30
}
onMounted(() => {
  setCarouselHeigh()
  window.addEventListener('resize', setCarouselHeigh)
})
onUnmounted(() => window.removeEventListener('resize', setCarouselHeigh))
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
// const carousel_height=




</script>

<template>
  <div ref="carousel">
    <el-carousel class="carousel" :interval="4000" :height="carousel_height + 'px'">
      <el-carousel-item label="🔴" v-for="banner in banners">
        <div class="carousel-item" @click="bannerClick(banner)">
          <MyImage aspect-ratio="16/6" :lazy="false" :src="banner.imageUrl"></MyImage>
          <span class="lable" :style="{ backgroundColor: banner.titleColor }">{{ banner.typeTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="less">
.carousel {
  &:deep(.el-carousel__indicators--labels .el-carousel__button) {
    padding: 0;
  }
}

.carousel-item {
  // height: 400px;
  border-radius: 8px;
  position: relative;

  img {
    width: 100%;
    aspect-ratio: 16/6;
    border-radius: 10px;
  }


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
</style>
