<script setup lang="ts">
import { alpha, curColor } from '../assets/js/index/theme_color'

const defaultColors = ['white', '#ec4141', 'pink', 'black', 'blue']




</script>

<template>
  <div class="container">
    <div>
      <h5 class="title">颜色:</h5>
      <div class="box">
        <div class="item" v-for="(c) in defaultColors" :style="{ backgroundColor: c }" @click="curColor = c"
          :class="{ active: c === curColor }"></div>

      </div>

    </div>
    <div>
      <h5 class="title"> 透明度：</h5>
      <el-slider size="small" :min="50" :debounce="500" label="12" v-model="alpha" />
    </div>

  </div>
</template>

<style scoped lang="less">
.container {
  .title {
    padding: 4px;
  }

  >div {
    margin-bottom: 10px;
  }
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .item {
    position: relative;
    // min-width: 40px;
    aspect-ratio: 1;
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid var(--color-text-light);

  }

  .active {

    &::after {
      @w: 18px;
      content: '√';
      text-align: center;
      position: absolute;
      bottom: -10px;
      right: -5px;
      font-size: @w/2;
      width: @w;
      height: @w;
      border: 3px solid #fff;
      border-radius: 50%;
      color: #fff;
      background-color: red;
    }
  }
}
</style>
