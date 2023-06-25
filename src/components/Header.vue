<script setup>
import { ref } from 'vue';
import SearchPanel from '@components/SearchPanel.vue'
</script>

<template>
  <div class="header">
    <div class="left">
      <img class="logo" src="@/assets/img/wangyiyunlogo.png" alt="">
      <span>网易云音乐</span>
    </div>
    <div class="middle">
      <span @click="$router.back">
        <img src="@/assets/img/arrow-left.png">
      </span>
      <span @click="$router.forward">
        <img src="@/assets/img/arrow-right.png">
      </span>
      <SearchPanel></SearchPanel>
    </div>
    <div class="right">
      <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <span> xue6474</span>
    </div>
    <span></span>
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: azure;
  font-weight: 500;
  height: 100%;
  overflow-wrap: nowrap;
  font-size: 1rem;

  .left {
    max-width: 20vw;
    padding-right: 10vw;

    .logo {
      height: 2rem;
      vertical-align: middle;
      padding-right: 0.5rem;
    }
  }

  .middle {
    flex: 1;
    display: flex;

    align-items: center;
    justify-content: center; // 水平对齐，不然会有竖直线。。。。。。。。

    img {
      height: 1rem;
      padding: 0 0.2rem;
      vertical-align: middle;

    }
  }

  .right {
    flex: 1;

    .avatar {
      vertical-align: middle;
    }
  }


}
</style>
