<script setup lang="ts">
import { usePageShowStore } from './store/page-show-state-store'
import { useGlobalPropsStore } from './store/global-props-store'
// import hot_recom from './assets/js/index/hot_recom'
const color = ref('blue')


const { aside, footer } = storeToRefs(usePageShowStore())
const { main_page_loading } = storeToRefs(useGlobalPropsStore())

</script>

<template>
  <el-container style="height: 100%">

    <el-header class="header  drag">
      <Header></Header>
    </el-header>
    <el-container style=" overflow: auto">
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
  color: v-bind(color);
  width: 20vw;
  min-width: 150px;
}

#main {
  animation: collapse 0.3s ease-in;
  padding: 14px;
  overflow-x: hidden;

  .main-container {
    margin: 0 auto;
    max-width: 1000px;
    height: 100%;
  }
}

.header {
  background-color: #ec4141;
  height: 50px;
}

@keyframes collapse {
  0% {
    transform: translateY(100%);
    // transform: scale(0);
  }

  100% {
    transform: translateY(0);
    // transform: scale(1);
  }
}

.footer {
  height: 60px;
  // background-color: bisque;
  padding: 0px;

}
</style>
