<script setup lang="ts">
import SearchPanel from '@components/SearchPanel.vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
import { ArrowLeft, ArrowRight, CaretBottom, Minus, Close, FullScreen, Sugar } from '@element-plus/icons-vue'
const { $store, $COMMON, $utils, $confirm, $messageBox } = getCurrentInstance()?.proxy!
const [store, globalStore] = [$store.userLoginStore(), $store.useGlobalPropsStore()]

const { setLoginCardVisible, signin, logout, set_song_detail_status } = { ...store, ...globalStore }
const { loginStatus, loginCardVisible, userInfo, todaySignedIn, song_detail_status } = { ...storeToRefs(store), ...storeToRefs(globalStore) }

const debounceSignin = $utils.debounce(signin, 500)
function logout_confirm() {
  $confirm('确定要退出登录吗？').then(logout).catch(console.log)

}
enum EXIT_TYPE { minimizeSystemtray, exit }
const exit_type = ref(EXIT_TYPE.minimizeSystemtray)
const window_control = {
  isElectron() {
    if (window.app_control) return true
    else $messageBox({ message: ' 该功能在仅electron环境下可用', type: 'error' })
  },
  minimize() {
    this.isElectron() && window.app_control.window_control({ type: 'min' })
  },
  maximize() {
    this.isElectron() && window.app_control.window_control({ type: 'max' })

  },
  close() {

    if (!this.isElectron()) return

    $messageBox({
      title: '关闭提示',
      center: true, roundButton: true, showClose: true, confirmButtonText: '确定',
      message: h(ElRadioGroup, { modelValue: exit_type as any, onChange(val: any) { exit_type.value = val } }, () => [
        h(ElRadio, { size: 'small', label: EXIT_TYPE.minimizeSystemtray }, () => '最小化到系统托盘'),
        h(ElRadio, { size: 'small', label: EXIT_TYPE.exit }, () => '退出网易云音乐')
      ]),
      buttonSize: 'small'
    }).then(() => {
      if (exit_type.value === EXIT_TYPE.minimizeSystemtray) {
        window.app_control.window_control({ type: 'hide' })
      } else {
        window.app_control.window_control({ type: 'close' })
      }
    })
  }
}
</script>

<template>
  <!-- <input type="radio"> -->
  <div class="header">
    <div class="left">

      <div class="no-drag logo" @click="$router.push('index')">
        <el-link :underline="false" style="color: inherit;">
          <i v-if="song_detail_status" @click="set_song_detail_status(false)" style="color: inherit;font-size:2rem;"
            class="iconfont icon-arrow "></i>

          <span v-else>
            <svg t="1691343414949" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              style="fill: inherit;">
              <path d="M338.048 349.248" p-id="3233"></path>
              <path
                d="M521.024 82.112c-244.224 0-442.176 197.952-442.176 442.176s197.952 442.176 442.176 442.176 442.176-197.952 442.176-442.176S765.248 82.112 521.024 82.112zM727.552 660.928c-18.048 51.584-68.096 100.544-127.36 123.264-31.424 12.352-94.912 16.512-129.408 8.256C315.52 756.288 236.16 559.872 319.168 418.048c27.328-46.912 101.568-110.336 128.896-110.336 6.208 0 15.488 4.672 20.096 9.792 16.512 18.048 8.256 31.488-36.096 62.912-62.912 44.864-90.24 95.424-90.24 166.592 0 57.728 21.632 107.264 64.96 146.944 35.584 32.512 63.936 43.84 113.472 44.352 69.12 0 118.592-29.376 147.456-87.68 15.488-31.424 16-35.584 13.952-79.424-2.048-39.68-4.096-49.472-17.536-70.656-14.464-23.232-58.752-55.168-66.496-47.936-1.536 2.048 1.536 21.632 7.744 43.84 5.696 22.208 10.304 44.864 10.304 50.56 0 41.792-32.512 85.056-71.68 95.936-66.496 18.048-120.64-33.024-120.64-113.984 0-56.192 27.84-98.496 79.424-121.664l18.56-8.256-2.048-44.352c-2.56-40.192-1.536-45.888 8.768-59.328 25.28-31.424 66.496-42.816 101.568-27.84 21.12 8.768 42.816 30.4 42.816 42.304 0 11.84-13.952 28.864-23.744 28.864-3.584 0-16-4.608-27.328-10.816-25.28-12.864-36.608-11.328-46.4 6.208-6.208 11.328-6.72 17.536-1.536 34.56 5.696 19.072 8.256 21.12 30.912 26.816 58.24 13.952 97.472 48.96 120.64 107.776C739.904 541.312 741.504 622.272 727.552 660.928z"
                p-id="3234"></path>
              <path
                d="M503.168 472.128c-16.512 10.304-33.024 42.304-33.024 65.472 0 19.584 13.44 46.912 25.792 53.632 22.656 12.352 56.704-8.768 56.704-35.072 0-7.744-4.096-32-8.768-54.144C533.568 458.176 529.984 455.616 503.168 472.128z">
              </path>
            </svg>
            <span>网易云音乐</span></span>
        </el-link>
      </div>
    </div>
    <div class="middle">
      <el-button class=" back" @click="$router.back" size="small" :icon="ArrowLeft" circle />
      <el-button class="forward " @click="$router.forward" size="small" :icon="ArrowRight" circle />
      <SearchPanel></SearchPanel>
    </div>
    <div class="right">
      <div class="user">
        <!-- 用户资料卡片 -->
        <el-popover v-if="loginStatus" placement="bottom" :width="240" trigger="click">
          <template #reference>
            <el-link style="color: inherit;" :underline="false">
              <el-avatar class="avatar" size="small"
                :src="userInfo?.profile.avatarUrl + $COMMON.IMG_SIZE_SEARCH_PARAMS.squar.small" />
              <span class="hover-text">{{ userInfo?.profile.nickname }}</span>
              <el-icon>
                <CaretBottom />
              </el-icon>
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

        <el-link v-else style="color: inherit;font-size: inherit;" :underline="false" @click="setLoginCardVisible(true)">
          <el-avatar class="avatar" size='small' />
          <span class="hover-text">未登录</span>
        </el-link>
        <LoginCard v-if="loginCardVisible"></LoginCard>
      </div>
      <span class="icon">
        <el-popover width="200px" trigger="click">
          <template #reference>
            <el-icon>
              <Sugar />
            </el-icon>
          </template>
          <ThemeColorBox></ThemeColorBox>
        </el-popover>
      </span>
      <span class="icon" @click="window_control.minimize"><el-icon>
          <Minus />
        </el-icon></span>
      <span class="icon" @click="window_control.maximize"><el-icon>
          <FullScreen />
        </el-icon></span>
      <span class="icon" @click="window_control.close"><el-icon>
          <Close />
        </el-icon></span>
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

@baseFontSize: 12px;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  overflow-wrap: nowrap;
  font-size: @baseFontSize;

  .left {
    padding-right: 20px;
    font-size: 16px;

    .logo {

      .icon {
        height: 34px;
        vertical-align: middle;
        margin-right: 6px;
      }

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
      color: inherit;
      background-color: inherit;
    }
  }

  .right {
    display: flex;
    justify-content: end;
    align-items: center;
    flex: 1;

    // font-size: 1rem;
    .icon {
      font-size: @baseFontSize+6px;
      font-weight: bolder;
      .hover-text
    }

    >* {
      .no-drag;
      padding: 0 0.8rem;
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
