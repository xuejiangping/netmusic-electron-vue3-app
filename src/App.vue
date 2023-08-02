<script setup lang="ts">
import { usePageShowStore } from './store/page-show-state-store'
import { useGlobalPropsStore } from './store/global-props-store'
// import hot_recom from './assets/js/index/hot_recom'


const { aside, footer } = storeToRefs(usePageShowStore())
const { main_page_loading } = storeToRefs(useGlobalPropsStore())

</script>

<template>
  <el-container style="height: 100%">

    <el-header class="header  drag">
      <Header></Header>
    </el-header>
    <el-container id="container" style=" overflow: auto">
      <el-aside v-show="aside" class="aside" style="background-color: antiquewhite">
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
.aside {
  width: 20vw;
  min-width: 150px;
}

#main {
  padding: 14px;
  overflow-x: hidden;
  position: relative;

  .main-container {
    margin: 0 auto;
    max-width: 1000px;
    height: 100%;
  }
}

.header {
  background-color: var(--color-theme);
  height: var(--header-height);
}



.footer {
  height: var(--footer-height);
  // background-color: bisque;
  padding: 0px;

}
</style>
