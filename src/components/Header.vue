<script setup lang="ts">
import SearchPanel from '@components/SearchPanel.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const { $store, $COMMON, $utils, $confirm } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { setLoginCardVisible, signin, logout } = store
const { loginStatus, loginCardVisible, userInfo, todaySignedIn } = storeToRefs(store)

const debounceSignin = $utils.debounce(signin, 500)
function logout_confirm() {
  $confirm('确定要退出登录吗？').then(logout).catch(console.log)

}
</script>

<template>
  <div class="header">
    <div class="left">
      <div class="no-drag interact" @click="$router.push('index')">
        <img class="logo" src="@/assets/img/wangyiyunlogo.png">
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
        <el-popover v-if="loginStatus" placement="bottom" :width="240" trigger="click">
          <template #reference>
            <el-link type="info" style="color: #fff;" :underline="false">
              <el-avatar class="avatar" size="small"
                :src="userInfo?.profile.avatarUrl + $COMMON.IMG_SIZE_SEARCH_PARAMS.squar.small" />
              <span>{{ userInfo?.profile.nickname }}</span>
            </el-link>
          </template>

          <div class="info-card">
            <div class="event">
              <span>{{ userInfo?.profile.eventCount }}</span>
              <span>{{ userInfo?.profile.follows }}</span>
              <span>{{ userInfo?.profile.followeds }}</span>
              <span>动态</span>
              <span>关注</span>
              <span>粉丝</span>
            </div>
            <div style="margin: 0.8rem 0;text-align: center;">
              <el-button @click="debounceSignin" size="default" :disabled="todaySignedIn"
                round>{{ todaySignedIn ? '已签到' : '签到' }}</el-button>
            </div>

            <div class="function-list">
              <ul>
                <li @click="logout_confirm">退出登录</li>
              </ul>
            </div>

          </div>
        </el-popover>

        <MyLink v-else color="#fff" @click="setLoginCardVisible(true)">
          <el-avatar class="avatar" size='small' />
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

.info-card {
  .event {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;

    span:nth-child(-n+3) {
      font-weight: 700;
      font-size: large;
    }

  }

  .function-list {
    li {
      padding: 5px;

      &:hover {
        background-color: var(--color-text-white);

      }
    }

  }
}

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
    justify-content: center; // 水平对齐，不然会有竖直线。。。。。。。。

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

    .user {
      color: blue;
    }

  }


}
</style>
