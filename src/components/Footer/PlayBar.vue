<script setup lang="ts">
import { Share, StarFilled, Download } from '@element-plus/icons-vue'



//==========================================================
//
//        数据

//==========================================================
const { $utils, $confirm, $store } = getCurrentInstance()?.proxy!

const PLAYBAR_OPTIONS = 'playbar_options'
const store = $store.usePlayStateStore()
const { currentSong, playList, isPaused, currentLoopOption } = toRefs(store)
const { next, prev, switchLoopOption, clearPlayList, changeUserClickPlayActionType } = store
// $confirm('双击播放单曲时，用当前歌曲所在的歌曲列表替换播放列？')

const cover = computed(() => {

  return currentSong.value?.album.cover || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})
const baseOptions = {
  currentPlayProgress: 0,  //播放进度
  volume: 50,   //当前音量
  lastVolume: 0,    //静音前的音量
  isShowPlayListBox: false,
  inputVal: 0,   //输入的播放时间，用于更改播放进度，单位秒
  currenPlayTime: 0,//当前 歌曲播放时间
}
const initedOptions: typeof baseOptions = $utils.localstorage.save_and_load(PLAYBAR_OPTIONS, () => options, window.NetMusic.init) || baseOptions
const options = reactive(initedOptions)
const { currenPlayTime, inputVal,
  currentPlayProgress, volume, lastVolume, isShowPlayListBox } = toRefs(options)
// $utils.localstorage.save_when_unload(PLAYBAR_OPTIONS, )
window.document.addEventListener('click', () => isShowPlayListBox.value = false)

//==========================================================
const carousel = ref()   //左边的轮播组件
const audio = ref() // audio-box 

//==========================================================

/**************************************************
*        业务
 **************************************************/
// 
function switchMute() {
  // console.log('121', 121)
  if (isMuted.value) volume.value = lastVolume.value;
  else {
    lastVolume.value = volume.value
    volume.value = 0
  }
}
/**************************************************
*
*        计算属性
*
 **************************************************/

const isMuted = computed(() => volume.value == 0)

/**将当前歌曲播播放百分比 转换为 分秒格式时间*/
const formatedCurTime = computed(() => {
  if (!currentSong.value) return ''
  const time = $utils.transformSongTime({ dt: currentSong.value.dt, percent: currentPlayProgress.value })
  return $utils.formatSongTime(time ?? 0)
})
/**************************************************
*
*        watch
*
 **************************************************/

watch(currenPlayTime, (val) => {
  currentPlayProgress.value = currentSong.value ? $utils.transformSongTime({ dt: currentSong.value.dt, time: val * 1000 }) : 0
})

</script>

<template>
  <ul class="container">
    <!-- 播放列表无歌曲时显示 该模态 -->
    <li v-if="!playList.length" class="modal"></li>

    <!-- 左边显示当前歌曲信息部分 -->
    <li>
      <div v-if="currentSong" class="left">
        <el-carousel :initial-index="1" indicator-position="none" ref="carousel" height="46px" direction="vertical"
          :autoplay="false">
          <el-carousel-item>
            <div class="left-top">
              <div class="arrow-down" @click="carousel.next"> <i class="iconfont icon-arrow"></i></div>
              <el-button color="#fff5" circle :icon="StarFilled" />
              <el-button color="#fff5" circle :icon="Download" />
              <el-button color="#fff5" circle :icon="Share" />
            </div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="left-bottom">
              <div @click="carousel.next">
                <div class="img">
                  <my-image :src="cover"></my-image>
                  <span></span>
                </div>
              </div>
              <div class="info">
                <div v-title class="name">{{ currentSong.name }}</div>
                <div v-title>{{ currentSong.artists[0].name }}</div>
              </div>
            </div>
          </el-carousel-item>

        </el-carousel>
      </div>
    </li>
    <!-- 中间播放 控制 部分 -->

    <li class="middle">
      <div class="control">
        <div class="top">
          <span class="loop" @click="switchLoopOption" :title="currentLoopOption.title">
            <el-popover trigger="click" effect="dark" :content="currentLoopOption.title" width="60px" :auto-close="1000">
              <template #reference>
                <i slot="reference" :class="currentLoopOption.icon"></i>
              </template>
            </el-popover></span>
          <i @click=" changeUserClickPlayActionType('prev'); prev()" class="iconfont icon-audio-prev"></i>
          <i v-if="isPaused" @click="audio.play" class="iconfont icon-play"></i>
          <i v-else @click="audio.pause" class="iconfont icon-pause"></i>
          <i @click=" changeUserClickPlayActionType('next'); next()" class="iconfont icon-audio-next"></i>
          <span class="lyric">词</span>
        </div>
        <div class="bottom">
          <span>{{ formatedCurTime }}</span>
          <div class="progress"><progress-bar
              @change="val => inputVal = $utils.transformSongTime({ dt: (currentSong?.dt || 0) / 1000, percent: val })"
              v-model="currentPlayProgress"></progress-bar></div>
          <span>{{ currentSong?.duration }}</span>
        </div>
      </div>

    </li>
    <!-- 右边部分 -->

    <li>
      <div v-if="playList.length" class="right">
        <div class="volume">
          <div class="icon" @click="switchMute">
            <i v-if="isMuted" class="iconfont icon-volume-active"></i>
            <i v-else class="iconfont icon-volume"></i>
          </div>
          <div class="box">
            <progress-bar :height="5" v-model="volume"></progress-bar>
          </div>

        </div>
        <div class="playlist" @click.stop>
          <div class="icon">
            <i @click="isShowPlayListBox = !isShowPlayListBox" title="当前播放列表" class="iconfont icon-add "></i>
          </div>
          <div class="box" v-show="isShowPlayListBox">
            <h2>当前播放</h2>
            <div class="info"> <span>总{{ playList.length }}首</span> <a @click="clearPlayList" href="javascript:;"><i
                  class="iconfont icon-del"></i> 清空列表</a></div>
            <div class="list">
              <song-table size="small" :data-list="playList" :show-header="false"
                :need-show-items="['singer', 'duration', 'title']">
                <template #title-prefix="{ song }">
                  <i v-if="song.id === currentSong?.id" class="iconfont icon-volume"></i>
                </template>
              </song-table>
            </div>
          </div>
        </div>
      </div>

    </li>
    <!-- audio元素 -->
    <li>
      <audio-box ref="audio" @update-song-time="val => currenPlayTime = val" :inputVal="inputVal"
        :currenPlayTime="currenPlayTime" :volume="volume"></audio-box>
    </li>
  </ul>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';


.container {
  display: grid;
  position: relative;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  font-size: 12px;
  max-height: 60px;
  padding: 7px;
  border-top: 1px solid var(--color-border);

  .modal {
    position: absolute;
    left: 0;
    top: 0px;
    background-color: var(--color-modal-gray);
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .left-bottom {
    display: flex;
    // align-items: center;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 10px;

      >div {
        .multi-line(1)
      }
    }

    .img {
      width: 46px;
    }
  }

  .left-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .arrow-down {
      padding-right: 1rem;
      font-size: 2rem;
      cursor: pointer;
    }

    i {
      font-size: 2rem;
      vertical-align: middle;
    }
  }

  .middle {
    display: flex;
    justify-content: center;

    .control {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .top {
        align-self: center;
        width: 70%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .iconfont {
          font-size: 26px;
          color: var(--color-text-main);
        }

        .loop i,
        .lyric {
          font-size: small;
        }

      }

      .bottom {
        display: flex;
        color: var(--color-text);

        >span {
          font-size: small;
        }

        .progress {
          flex: 1;
          padding: 0 5px;

        }
      }
    }

  }

  .right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon {
      .iconfont {
        font-size: large;
        color: var(--color-text-main);
      }
    }

    .volume {
      position: relative;

      &:hover {
        .box {
          display: block;
        }
      }

      .box {
        display: none;
        transform: rotate(-90deg);
        left: -50px;
        top: -90px;
        width: 100px;
        background-color: #fbfbfb;

        &::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 0;
          width: 30px;
          height: 30px;
        }
      }
    }

    .playlist {

      .box {
        display: flex;
        flex-direction: column;
        bottom: 61px;
        right: 0;
        height: calc(100vh - 130px);
        width: 35%;
        background-color: #fbfbfb;
        // font-size: x-small;

        .info {
          margin: 0.8rem;
          display: flex;
          justify-content: space-between;
          color: var(--color-text);
          // justi
        }

        .list {
          flex: 1;
          overflow: auto;
        }
      }
    }



    .box {
      position: absolute;
      z-index: 3;
      padding: 10px;
      padding-top: 8px;
      box-shadow: var(--el-box-shadow);
      border-radius: 5px;
    }
  }

}
</style>
