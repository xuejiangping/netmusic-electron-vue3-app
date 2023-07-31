<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue'
import { Directive } from 'vue';
const { $store, $http } = getCurrentInstance()?.proxy!
const store = $store.usePlayStateStore()
const { audioELcontrol } = store
const { isPaused, currentSong } = storeToRefs(store)
const a = ref(false)



const comment = ref()
const showCommentBtn = ref(false)
const aside_status = ref(true)
defineEmits(['close'])
defineProps<{
  currenPlayTime: number
}>()
/*******************观察评论区，若超过10%，则展示发表评论按钮**************************/
const vIntersection: Directive = {
  beforeMount(el: HTMLElement & { ob: IntersectionObserver }) {
    const ob = el.ob = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        showCommentBtn.value = true
      } else if (entry.intersectionRatio !== 0) {
        showCommentBtn.value = false
      }
    }, { threshold: 0.1, rootMargin: '100px 0px 0px 0px' })
    ob.observe(el)
  },
  beforeUnmount(el) {
    el.ob.disconnect()
  }
}




</script>

<template>
  <div class="bg">

    <div class="container">

      <el-button v-if="showCommentBtn" @click="comment.setInputBoxStatus(true)" color="#f1f1f1"
        style="position: absolute; left: 50%;bottom: 10px;transform: translate(-50%);" :icon="EditPen" size="small" round>
        发表评论</el-button>
      <el-link @click="$emit('close')" :underline="false" style="position: absolute;left: 5px;top: 5px;">
        <i style="color: #000;font-size:2rem;" class="iconfont icon-arrow "></i>
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
          <div v-title style="width: 40%" @click="$emit('close')">
            <RouterLink v-for="({ name, id }, i) in currentSong?.artists" v-split="[i]"
              :to="{ name: 'singer', query: { name, id } }">
              {{ name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="middle">
        <el-button type="" @click="aside_status = !aside_status"
          style="position: absolute;right: -10px;top: 10%; z-index: 1;writing-mode: vertical-lr;padding: 5px">{{ aside_status ? '收起' : '展开' }}</el-button>
        <div>
          <div @click="audioELcontrol && isPaused ? audioELcontrol.play() : audioELcontrol?.pause()"
            style="position: relative;" :class="{ 'active-playing': !isPaused }">
            <img src="../assets/img/stylus.png" class="stylus">
            <div class="cover" @click="a = !a">
              <img :src="currentSong?.album.cover" class="img">
            </div>
          </div>
        </div>
        <div class="lyric" style="flex: 1.1;">2
          <p>{{ currenPlayTime }}</p>
        </div>
        <div v-show="aside_status" class="aside">
          <ul>
            <li class="title">包含这首歌的歌单</li>
            <li class="item" @click="$emit('close')" v-for="() in 4">
              <span class="img">
                <MyImage aspect-ratio="1/1" :src="''"></MyImage>
              </span>
              <span v-title class="name">{{ '歌单名111111111111111111111111111111111111111' }}</span>
            </li>
          </ul>
          <ul>
            <li class="title">喜欢这首歌的人也喜欢</li>
            <li class="item">
              <span class="img">
                <MyImage aspect-ratio="1/1" :src="''"></MyImage>
              </span>
              <span v-title class="name">{{ '歌曲名' }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- <el-affix position="bottom" :offset="20">
        <el-button type="primary">发表评论</el-button>
      </el-affix> -->
      <div class="bottom" v-intersection>
        <Comment ref="comment" layout='absolute' :comment-data="{}"></Comment>
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
      line-height: 1.5rem;
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
        width: 16rem;
        max-width: 280px;
        border-radius: 50%;
        background: url('../assets/img/vinyl.png') no-repeat;
        background-size: cover;
        border: 8px solid #cacbca;
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
          border: 8px solid #000;

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
      background: red;

      height: 800px;
      width: 60%;
      margin: 0 auto;
      min-width: 400px;
    }
  }
}
</style>
