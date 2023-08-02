<script setup lang="ts">
import { EditPen, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { Directive } from 'vue';
import lyric_handler from '../assets/js/index/lyric'
const { $store, $http, $notify, $utils } = getCurrentInstance()?.proxy!
const store = $store.usePlayStateStore()
const { addSong } = $store.usePlayStateStore()
const { audioELcontrol } = store
const { isPaused, currentSong } = storeToRefs(store)
defineEmits(['close'])
const props = defineProps<{
  currenPlayTime: number,
}>()



const { lyric, curIndex, offsetTime } = lyric_handler({ currenPlayTimeRef: toRef(props, 'currenPlayTime'), id: toRef(() => currentSong.value?.id!) })
// watchEffect(() => console.log(lyric.value?.lines[curIndex.value]))

const { commentRef, showCommentBtn, aside_status, simiPlaylists, simiSongs } = toRefs(shallowReactive({
  commentRef: null as any,
  showCommentBtn: false,
  aside_status: true,
  simiSongs: [] as SongItem[],
  simiPlaylists: [] as PlaylistItem[]
}))


watchEffect(() => {
  if (currentSong.value) {
    const id = unref(currentSong.value.id)
    $http.simiSong({ id }).then(res => simiSongs.value = $utils.formatList('songlist', res.songs, 'middle'))
    $http.simiPlayList({ id }).then(res => simiPlaylists.value = $utils.formatList('playlist', res.playlists, 'middle'))
  }

})






/*******************观察评论区，若超过10%，则展示发表评论按钮**************************/
const vIntersection: Directive = {
  beforeMount(el: HTMLElement & { ob: IntersectionObserver }) {
    const ob = el.ob = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        showCommentBtn.value = true
      } else {
        showCommentBtn.value = false
      }
    }, { rootMargin: '-100px' })
    ob.observe(el)
  },
  beforeUnmount(el) {
    el.ob.disconnect()
  }
}

/***********************歌词滚动·*************************/
const lyric_scroll_parentEl = ref<HTMLElement>()
watchEffect(() => {
  const _lyric_scroll_parentEl = unref(lyric_scroll_parentEl)
  if (_lyric_scroll_parentEl) {
    const el = _lyric_scroll_parentEl.children[curIndex.value] as HTMLElement
    // console.log('el', el)
    if (el) {
      const offset_y = 50
      const scrollEl = el.offsetParent!
      const y = el.offsetTop - scrollEl.clientHeight / 2
      scrollEl.scroll({ top: y + offset_y, behavior: 'smooth' })
    }
  }
})

</script>

<template>
  <div class="bg">

    <div class="container">

      <el-button v-if="showCommentBtn" @click="commentRef?.comment" color="#f1f1f1"
        style="position: absolute; left: 50%;bottom: 10px;transform: translate(-50%);" :icon="EditPen" size="small" round>
        发表评论</el-button>
      <el-link @click="$emit('close')" :underline="false" style="position: absolute;left: 5px;top: 5px;">
        <i style="color: #000;font-size:3rem;" class="iconfont icon-arrow "></i>
      </el-link>

      <div class="top">
        <h1 class="title">{{ currentSong?.name }}</h1>
        <div>
          <RouterLink @click="$emit('close')"
            :to="{ name: 'album', query: { name: currentSong?.album.name, id: currentSong?.album.id } }">
            {{ currentSong?.album.name }}
          </RouterLink>
        </div>
        <div style="display: flex;justify-content: center;">
          <div v-title style="width: 40%">
            <RouterLink @click="$emit('close')" v-for="({ name, id }, i) in currentSong?.artists" v-split="[i]"
              :to="{ name: 'singer', query: { name, id } }">
              {{ name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="middle">
        <el-link class="swich-aside-btn" type="warning" title="切换侧边栏"
          @click="aside_status = !aside_status">{{ aside_status ? '收起' : '展开' }}</el-link>
        <div>
          <div @click="audioELcontrol && (isPaused ? audioELcontrol.play() : audioELcontrol.pause())"
            style="position: relative;" :class="{ 'active-playing': !isPaused }">
            <img src="../assets/img/stylus.png" class="stylus">
            <div class="cover">
              <img :src="currentSong?.album.cover" class="img">
            </div>
          </div>
        </div>
        <!-- 歌词部分 -->
        <div class="lyric-container">
          <div class="adjust">
            <el-icon title="后退1s" @click="offsetTime -= 1000; $notify({ message: '后退1s', duration: 500 })">
              <ArrowUp />
            </el-icon>
            <el-icon title="前进1s" @click="offsetTime += 1000; $notify({ message: '前进 1s', duration: 500 })">
              <ArrowDown />
            </el-icon>
          </div>
          <div class="lyric">
            <ul ref="lyric_scroll_parentEl">
              <li v-for="(item, i) in lyric?.lines">
                <span :class="{ 'active-lyric': i === curIndex }">{{ item.txt }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 右边栏 推荐 -->
        <div v-show="aside_status" class="aside">
          <h4 class="title">包含这首歌的歌单</h4>
          <ListItem v-for="(item) in simiPlaylists" cover_width="2rem" :img1v1-url="item.cover"
            @click="$emit('close'); $router.push({ name: 'playlist-detail', query: { name: item.name, id: item.id } })">
            <span v-title class="name">{{ item.name }}</span>
          </ListItem>
          <h4 class="title">喜欢这首歌的人也喜欢</h4>
          <ListItem cover_width="2rem" v-for="(item) in simiSongs" :img1v1-url="item.album.cover"
            @click=" addSong(item, true)">
            <span v-title class="name">{{ item.name }}</span>
          </ListItem>

        </div>
      </div>
      <div class="bottom" v-intersection>
        <Comment v-if="currentSong" ref="commentRef" layout='absolute' type='歌曲'
          :info="{ id: currentSong.id, name: currentSong.name }">
        </Comment>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('../assets/css/global.less');

.bg {
  background: linear-gradient(to bottom, #c2c2c4, #fff 60%);
  height: 100%;
  overflow: auto;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    .top {
      text-align: center;
      line-height: 2rem;
      color: var(--color-text);
      margin: 1rem 0;

      .title {
        font-size: 1.8rem;
        color: var(--color-text-main);
        padding: 0.5rem 0;

      }
    }

    .middle {
      position: relative;
      display: flex;
      margin: 2.5rem 0;
      height: 20rem;
      // text-align: center;

      // justify-content: space-evenly;
      .swich-aside-btn {
        position: absolute;
        right: -5px;
        top: 50%;
        z-index: 1;
        writing-mode: vertical-lr;
        font-size: smaller;
        // border: 1px dotted;
        // padding: 0.3rem;
      }

      .lyric-container {
        flex: 1.2;
        position: relative;

        .adjust {
          display: none;
          position: absolute;
          right: 0;
          writing-mode: vertical-lr;
          z-index: 1;

          >* {
            border: 1px solid var(--color-text-light);
            cursor: pointer;
            margin: 0.2rem 0;
          }
        }

        &:hover .adjust {
          display: unset;
        }

        .lyric {
          position: relative;
          text-align: center;
          line-height: 2.5rem;
          font-size: 0.9rem;
          overflow: auto;
          color: var(--color-text);
          height: 100%;



          ul {
            width: 60%;
            margin: 0 auto;
          }


        }

        .active-lyric {
          display: inline-block;
          font-weight: bold;
          // font-size: larger;
          transform: scale(1.5);
          color: var(--color-text-main);
          transition: 0.6s ease-out;
        }

      }

      >div {
        flex: 1;
      }

      .active-playing {
        .stylus {
          transform: rotate(-46deg);
        }

        .cover {
          animation-play-state: running;

        }
      }

      // background-color: blue;

      .stylus {
        position: absolute;
        top: -15%;
        left: 40%;
        z-index: 1;
        transform-origin: top;
        transform: rotate(-70deg);
        transition: all 0.5s;
        height: 55%;

      }

      .cover {
        position: relative;
        aspect-ratio: 1/1;
        width: 15rem;
        max-width: 280px;
        border-radius: 50%;
        background: url('../assets/img/vinyl.png') no-repeat;
        background-size: cover;
        border: 6px solid #cacbca;
        animation: soundPaying 15s linear infinite;
        margin: 0 auto;
        animation-play-state: paused;

        .img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 65%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 6px solid #000;

        }


      }

      @keyframes soundPaying {
        from {
          -webkit-transform: rotate(10deg);
          transform: rotate(10deg)
        }

        to {
          -webkit-transform: rotate(370deg);
          transform: rotate(370deg)
        }
      }


      .aside {
        overflow: auto;
        padding: 1rem;

        .title {
          font-weight: bold;
          line-height: 3rem;
        }

        .item {
          display: flex;
          align-items: center;
          column-gap: 1rem;
          padding: 0.3rem;
          border-radius: 5px;
          .hover-scale-mixin;

          >.img {
            width: 3rem;
          }

        }

      }
    }

    .bottom {
      // background: red;

      // height: 800px;
      width: 70%;
      margin: 0 auto;
      min-width: 400px;
    }
  }
}
</style>
