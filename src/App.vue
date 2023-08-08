<script setup lang="ts">
import { usePageShowStore } from './store/page-show-state-store'
import { useGlobalPropsStore } from './store/global-props-store'
// import hot_recom from './assets/js/index/hot_recom'
import Color from 'color'
window.Color = Color
const { aside, footer } = storeToRefs(usePageShowStore())
const { main_page_loading, cur_theme_color } = storeToRefs(useGlobalPropsStore())

</script>

<template>
  <el-container class="container">
    <el-header class="header-bg drag" :class="[cur_theme_color]">
      <Header></Header>
    </el-header>
    <el-container id="container" style=" overflow: auto">
      <el-aside v-show="aside" class="aside">
        <AsideNav></AsideNav>
      </el-aside>
      <el-main id="main">
        <Loading v-if="main_page_loading"></Loading>
        <div class="main-container" v-show="!main_page_loading">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
    <el-footer class="footer" v-show="footer">
      <PlayBar></PlayBar>
    </el-footer>
  </el-container>
</template>

<style scoped lang="less">
@import './assets/css/theme.less';

.container {
  position: relative;
  height: 100%;
  color: var(--color-text-main);
  background-color: var(--color-bg);

}

.aside {
  width: 20vw;
  min-width: 150px;
  margin-top: var(--header-height);

}

#main {
  padding: 14px;
  overflow-x: hidden;
  position: relative;

  .main-container {
    margin: 0 auto;
    max-width: 1000px;
    height: 100%;
    margin-top: var(--header-height);

  }
}

.header-bg {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  // &:extend(.my-theme .blue);
  // #my-theme.red;
  backdrop-filter: blur(10px) saturate(3);
  height: var(--header-height);
  z-index: 10;
}



.footer {
  height: var(--footer-height);
  // background-color: bisque;
  padding: 0px;

}
</style>
