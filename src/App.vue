<script setup lang="ts">

// import hot_recom from './assets/js/index/hot_recom'
const color = ref('blue')

// const main = ref(true)
// const footer = ref(true)



</script>

<template>
  <el-container style="height: 100%">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-container style=" overflow: auto">
      <el-aside class="aside" width="20vw" style="background-color: antiquewhite">
        <AsideNav></AsideNav>
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style=" background-color: bisque">Footer</el-footer>
  </el-container>
</template>

<style scoped lang="less">
.aside {
  color: v-bind(color);
}

#main {
  animation: collapse 0.3s ease-in;
  padding: 1rem;
  overflow-x: hidden;
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
</style>
