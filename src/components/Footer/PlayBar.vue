<script setup lang="ts">
import { Share, StarFilled, Download } from '@element-plus/icons-vue'

import usePlayStateStore from '../../store/play_state_store'


//==========================================================
//
//
//        数据
//
//
//==========================================================
const store = usePlayStateStore()
const { currenPlayingSong, playList, stateId, isPaused } = toRefs(store)
const { next, prev } = store
const { $utils } = getCurrentInstance()?.appContext.config.globalProperties!
let a = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const carousel = ref()   //左边的轮播 
const { playing, currenPlayingTime, inputVal,
  currentPlayProgress, volume, lastVol, isShowPlayListBox }
  = toRefs(reactive({
    playing: false,  //播放状态
    currentPlayProgress: 20,  //播放进度
    volume: 50,   //当前音量
    lastVol: 0,    //静音前的音量
    isShowPlayListBox: true,
    inputVal: 0,   //输入的播放时间，用于更改播放进度，单位秒
    currenPlayingTime: 0,//当前 歌曲播放时间
  }))
/**************************************************
*
*
*        业务
*
*
 **************************************************/
// 
function switchMute() {
  // console.log('121', 121)
  if (isMuted.value) volume.value = lastVol.value;
  else {
    lastVol.value = volume.value
    volume.value = 0
  }
}
/**************************************************
*
*
*        计算属性
*
*
 **************************************************/

const isMuted = computed(() => volume.value == 0)

/**将当前歌曲播放时间转换为百分比，供进度条使用 */
const formatedCurTime = computed(() => {
  if (!currenPlayingSong.value) return '0'
  const time = $utils.transformSongTime({ dt: currenPlayingSong.value.dt, percent: currentPlayProgress.value })
  return $utils.formatSongTime(time ?? 0)
})
/**************************************************
*
*
*        watch
*
*
 **************************************************/

watch(currenPlayingTime, (val) => {
  let per = $utils.transformSongTime({ dt: currenPlayingSong.value.dt, time: val * 1000 })
  currentPlayProgress.value = per ?? 0

})


</script>

<template>
  <ul class="container">
    <!-- 左边显示当前歌曲信息部分 -->

    <li>
      <div v-if="currenPlayingSong" class="left">
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
                <img :src="a">
              </div>
              <div class="info">
                <div v-title class="name">{{ currenPlayingSong.name }}</div>
                <div v-title>{{ currenPlayingSong.artists[0].name }}</div>
              </div>
            </div>
          </el-carousel-item>

        </el-carousel>
      </div>
    </li>
    <!-- 中间播放 控制 部分 -->

    <li v-if="currenPlayingSong" class="middle">
      <div>
        <div class="top">

          <span class="loop"><i class="iconfont icon-loop"></i></span>
          <i @click="prev" class="iconfont icon-audio-prev"></i>
          <i v-if="isPaused" @click="playing = !playing" class="iconfont icon-pause"></i>
          <i v-else @click="playing = !playing" class="iconfont icon-play"></i>

          <i @click="next" class="iconfont icon-audio-next"></i>
          <span class="lyric">词</span>
        </div>
        <div class="bottom">
          <span>{{ formatedCurTime }}</span>
          <div class="progress"><progress-bar
              @change="val => inputVal = $utils.transformSongTime({ dt: currenPlayingSong.dt / 1000, percent: val })"
              v-model="currentPlayProgress"></progress-bar></div>
          <span>{{ currenPlayingSong.duration }}</span>
        </div>
      </div>
    </li>
    <!-- 右边部分 -->

    <li>
      <div v-if="playList.length > 0" class="right">
        <div class="volume">
          <div class="icon" @click="switchMute">
            <i v-if="isMuted" class="iconfont icon-volume-active"></i>
            <i v-else class="iconfont icon-volume"></i>
          </div>
          <div class="box">
            <progress-bar :height="5" v-model="volume"></progress-bar>
          </div>

        </div>
        <div class="playlist">
          <div class="icon">
            <i @click="isShowPlayListBox = true" title="当前播放列表" class="iconfont icon-playlist "></i>
          </div>
          <div class="box" @mouseleave="isShowPlayListBox = false" v-show="isShowPlayListBox">
            <h2>当前播放</h2>
            <div class="info"> <span>总{{ playList.length }}首</span> <a href="javascript:;"><i
                  class="iconfont icon-del"></i> 清空列表</a></div>
            <div class="list">
              <song-table :list-id="stateId" :data-list="playList" :show-header="true"
                :need-show-items="['singer', 'duration', 'title']"></song-table>
            </div>
          </div>
        </div>
      </div>

    </li>
    <!-- audio元素 -->
    <li v-show="false">
      <audio-box @update-song-time="val => currenPlayingTime = val" :inputVal="inputVal"
        :play-progress="currentPlayProgress" :volume="volume" :cur-song-info="currenPlayingSong"></audio-box>
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
  font-size: .625rem;
  max-height: 60px;
  padding: 7px;
  border-top: 1px solid #dcdfe6;

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

    img {
      width: 46px;
      aspect-ratio: 1/1;
      border-radius: 5px;
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

    >div {
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

        >.iconfont {
          font-size: 24px;
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
