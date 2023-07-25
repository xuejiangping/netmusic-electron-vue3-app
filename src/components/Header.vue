<script setup lang="ts">
import SearchPanel from '@components/SearchPanel.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const { $store } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { setLoginCardVisible } = store
const { loginStatus, loginCardVisible } = storeToRefs(store)
</script>

<template>
  <div class="header">
    <div class="left">
      <div class="no-drag interact" @click="$router.push('index')">
        <img class="logo" src="@/assets/img/wangyiyunlogo.png" alt="">
        <span>网易云音乐</span>
      </div>
    </div>
    <div class="middle">
      <el-button class=" back" color="#d93c3c" @click="$router.back" size="small" type="danger" :icon="ArrowLeft"
        circle />
      <el-button class="forward " color="#d93c3c" @click="$router.forward" size="small" type="danger" :icon="ArrowRight"
        circle />
      <SearchPanel></SearchPanel>
    </div>
    <div class="right">
      <div class="user">
        <MyLink v-if="false">
          <el-avatar class="avatar" size='small'
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span>xue6474</span>
        </MyLink>
        <MyLink v-else color="#fff" @click="setLoginCardVisible(true)">
          <el-avatar class="avatar" size='small'
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span>未登录</span>
        </MyLink>
        <LoginCard v-if="loginCardVisible"></LoginCard>
      </div>
      <span>1</span><span>2</span><span>3</span>
    </div>
    <span></span>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-white);
  height: 100%;
  overflow-wrap: nowrap;
  font-size: 12px;

  .left {
    padding-right: 20px;
    font-size: 16px;

    .logo {
      height: 34px;
      vertical-align: middle;
      margin-right: 6px;
    }
  }

  .middle {
    >* {
      .no-drag;
    }

    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end; // 水平对齐，不然会有竖直线。。。。。。。。

    .back,
    .forward {
      margin: 0 3px;
      width: 20px;
      height: 20px;
    }
  }

  .right {
    display: flex;
    justify-content: end;
    align-items: center;
    flex: 1;

    >* {
      .no-drag;
      padding: 0 1rem;
    }

    .avatar {
      vertical-align: middle;
      margin-right: 0.5rem;
      // height: 30px;
      width: 36px;
      height: 36px;
    }
  }


}
</style>
