<script setup lang="ts">


const { $http, $utils, $COMMON } = getCurrentInstance()!.appContext.config.globalProperties

const route = useRoute()
let { id } = route.query as { id: string }
const mvDetailData = ref<{
  artistId: number,
  artistName: string,
  artists: any[],
  brs: any[], commentCount: number,
  cover: string,
  desc: string,
  name: string,
  playCount: number,
  publishTime: string,
  shareCount: number,
  videoGroup: any[]
}>()

const options = reactive({
  width: '30rem',
  height: '17rem',
  speedRate: [0.75, 1, 1.25],
  controlBtns: ['fullScreen', 'volume', 'audioTrack', 'quality'],
  poster: '',
  src: '',
  control: true,
  autoPlay: false
  // preload: "none",

  // type: 'mp4'
})
onBeforeMount(() => {
  $http.mvDetail({ id }).then(({ data }) => {
    mvDetailData.value = data
    options.poster = mvDetailData.value!.cover
    // getMvUrl(id)
  })
  $http.commentMv({ id }).then(({ comments, hotComments, total }) => commentData.value = { comments, hotComments, total })


})
const commentData = ref()
const getMvUrl = (id: string, r = 720) => {
  $http.mvUrl({ id, r }).then(({ data }) => options.src = data.url)
}
const avatarUrl = computed(() => {
  return mvDetailData.value?.artists[0].img1v1Url + $COMMON.IMG_SIZE_SEARCH_PARAMS.squar.small
})
const isShowDesc = ref(false)
</script>

<template>
  <div v-if="commentData">
    <h2>
      <label @click="$router.back()"><i class="back iconfont icon-arrow"></i><span>MV 详情</span></label>
    </h2>
    <div class="player">
      <vue3VideoPlay :options="options"></vue3VideoPlay>
    </div>
    <div class="info">
      <div><el-avatar style="vertical-align: middle;" :src="avatarUrl"></el-avatar>
        &nbsp;&nbsp;<RouterLink
          :to="{ name: 'singer', query: { name: mvDetailData?.artistName, id: mvDetailData?.artistId } }">
          <span>{{ mvDetailData?.artistName }}</span>
        </RouterLink>
      </div>

      <!-- <div> -->
      <h3>{{ mvDetailData?.name }} <i @click="isShowDesc = !isShowDesc" :class="{ 'arrow-down': isShowDesc }"
          class="arrow iconfont icon-audio-play"></i></h3>
      <div class="pub-time ">
        <span>发布: {{ mvDetailData?.publishTime }}</span>
        <span>播放: {{ mvDetailData?.playCount }}</span>
      </div>

      <!-- </div> -->
      <div class="group">
        <el-tag round v-for="({ name }) in mvDetailData?.videoGroup" type="success">
          {{ name }}</el-tag>
      </div>
      <div class="desc" v-show="isShowDesc">{{ mvDetailData?.desc }}</div>
      <div class="action">
        <el-tag round>点赞</el-tag>
        <el-tag round>分享({{ mvDetailData?.shareCount }})</el-tag>

      </div>
    </div>
    <div>
      <Comment :comment-data="commentData"></Comment>
    </div>
  </div>
  <Loading v-else></Loading>
</template>

<style scoped lang="less">
.back {
  display: inline-block;
  font-size: 2rem;
  vertical-align: middle;
  transform: rotate(90deg);
}

.player {
  margin: 1rem 0;
}

.info {
  >* {
    margin: 1rem 0;
  }

  .arrow {
    display: inline-block;
    color: #000;
    transform: rotate(-90deg);
    transition: all 0.5s;
  }

  .arrow-down {
    transform: rotate(90deg);
  }

  .margin-right {
    >* {
      margin-right: 1rem;
    }
  }

  .pub-time {
    color: var(--color-text);
    font-size: smaller;

    >* {
      margin-right: 1rem;
    }
  }

  .group {
    >* {
      margin-right: 1rem;
    }
  }

  .action {
    >* {
      margin-right: 1rem;
    }
  }
}
</style>