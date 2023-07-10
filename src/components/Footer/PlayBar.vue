<script setup lang="ts">
import { Share, StarFilled, Download } from '@element-plus/icons-vue'

import usePlayStateStore from '../../store/play_state_store'

const store = usePlayStateStore()

let a = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const isMuted = computed(() => volume.value == 0)


const { playing, val, volume, lastVol, isShowPlayListBox } = toRefs(reactive({
  playing: false,  //播放状态
  val: 20,  //播放进度
  volume: 50,   //当前音量
  lastVol: 0,    //静音前的音量
  isShowPlayListBox: false,
}))
// 
function switchMute() {
  console.log('121', 121)
  if (isMuted.value) volume.value = lastVol.value;
  else {
    lastVol.value = volume.value
    volume.value = 0
  }
}
let list = Array(20).fill(0).map((_, id) => ({ name: '121', id }))
</script>

<template>
  <ul class="container">
    <li class="left">

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
              <div v-title class="name">歌名</div>
              <div v-title>歌手</div>
            </div>
          </div>
        </el-carousel-item>

      </el-carousel>
    </li>
    <li class="middle">
      <div>
        <div class="top">

          <span class="loop"><i class="iconfont icon-loop"></i></span>
          <i class="iconfont icon-audio-prev"></i>
          <i v-show="playing" @click="playing = !playing" class="iconfont icon-play"></i>
          <i v-show="!playing" @click="playing = !playing" class="iconfont icon-pause"></i>
          <i class="iconfont icon-audio-next"></i>
          <span class="lyric">词</span>
        </div>
        <div class="bottom">
          <span>00:01</span>
          <div class="progress"><progress-bar body-style="padding:0" v-model="val"></progress-bar></div><span>03:12</span>
        </div>
      </div>
    </li>
    <li class="right">

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
        <i @click="isShowPlayListBox = true" title="当前播放列表" class="iconfont icon-playlist "></i>
        <div class="box" @mouseleave="isShowPlayListBox = false" v-if="isShowPlayListBox">
          <h2>当前播放</h2>
          <div class="info"> <span>总{{ 0 }}首</span> <a href="javascript:;">清空列表</a></div>
          <div class="list">
            <song-table :data-list="list" :show-header="true"
              :need-show-items="['singer', 'duration', 'title']"></song-table>
          </div>
        </div>
      </div>

    </li>
  </ul>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';


.container {
  display: grid;
  position: relative;
  grid-template-columns: 1fr 2fr 1fr;
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

        >* {
          font-size: 20px;
        }

        .loop i {
          font-size: small;
        }

        .lyric {
          font-size: smaller;
        }
      }

      .bottom {
        display: flex;
        color: var(--color-text);

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

    .iconfont {
      font-size: large;
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
      z-index: 1;
      padding: 10px;
      padding-top: 8px;
      box-shadow: var(--el-box-shadow);
      border-radius: 5px;
    }
  }

}
</style>
