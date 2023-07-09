<script setup lang="ts">
import {
  Share,
  Star, StarFilled, Download
} from '@element-plus/icons-vue'
import { ref } from 'vue';

// import { ref } from 'vue';

let a = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const carousel = ref()
console.log(carousel)
</script>

<template>
  <ul class="container">
    <li>

      <el-carousel initial-index="1" indicator-position="none" ref="carousel" height="46px" direction="vertical"
        :autoplay="false">
        <el-carousel-item>
          <div class="left-top">
            <div class="arrow-down" @click="carousel.next"> <i class="iconfont icon-arrow"></i></div>
            <el-button color="#fff5" circle :icon="StarFilled" />
            <el-button color="#fff5" circle :icon="Download" />
            <el-button color="#fff5" circle :icon="Share" s />
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
          <i class="iconfont icon-audio-play"></i>
          <i class="iconfont icon-audio-pause"></i>
          <i class="iconfont icon-audio-next"></i>
          <span class="lyric"><small>词</small></span>
        </div>
        <div class="bottom"><input type="range" name="" id=""></div>
      </div>
    </li>
    <li>demo3</li>
  </ul>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';


.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  font-size: 10px;
  max-height: 60px;
  padding: 7px;

  .left-bottom {
    display: flex;
    // align-items: center;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      >div {
        .multi-line(1)
      }
    }

    img {
      width: 46px;
      aspect-ratio: 1/1;
      border-radius: 5px;
      margin-right: 14px;
    }
  }

  .left-top {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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

        >* {
          padding: 0 8px;
        }

        >* {
          font-size: 1.5rem;
        }

      }

      .bottom {
        input {
          width: 100%;
          height: 0.2rem;

          &[type="range" i]::-webkit-slider-thumb {
            width: 3px;
          }
        }

      }
    }


  }


}
</style>
