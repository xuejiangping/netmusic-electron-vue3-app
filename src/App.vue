<script setup lang="ts">


// import hot_recom from './assets/js/index/hot_recom'
const color = ref('blue')
const header = ref(true)
const aside = ref(true)
// const main = ref(true)
const footer = ref(true)

// const router = useRouter()

/**
 * 切换到 初始布局
 */
// const switch_layout_header_main_footer = () => {
//   header.value = true
//   aside.value = true
//   footer.value = true
// }
// /**
//  * 切换到 main_footer 布局
//  */
// const switch_layout_main_footer = () => {
//   header.value = false
//   aside.value = false
// }
// /**
//  * 切换到 header_main 布局
//  */
// const switch_layout_header_main = () => {
//   aside.value = false
//   footer.value = false
// }
</script>

<template>
  <el-container style="height: 100%">
    <el-header class="header" v-show="header">
      <Header></Header>
    </el-header>
    <el-container style="flex: 8; overflow: auto">
      <el-aside class="aside" v-show="aside" width="20vw" style="background-color: antiquewhite">
        <AsideNav></AsideNav>
      </el-aside>
      <el-main id="main">

        <router-view></router-view>
        <!-- <Loading /> -->
      </el-main>
    </el-container>
    <el-footer v-show="footer" style="flex: 1; background-color: bisque">Footer</el-footer>
  </el-container>
</template>

<style scoped lang="less">
.aside {
  color: v-bind(color);
}

#main {
  animation: collapse 0.3s ease-in;
  padding: 1rem;
}

.header {
  background-color: #ec4141;
  flex: 1;
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
