<script setup lang="ts">
// import { Cloudy } from '@element-plus/icons-vue'

const { $store, $http } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { userPlaylist, loginStatus, } = storeToRefs(store)
const { setLoginCardVisible } = store
const { activeIndex, discover, myMusic, created } = toRefs(reactive({
  activeIndex: 'index',
  discover: {
    title: '',
    items: [
      { index: 'index', text: '发现音乐', icon: 'icon-index' },
      { index: 'rank', text: '排行榜', icon: 'icon-rank' },
      { index: 'playlist', text: '歌单', icon: 'icon-playlist' },
      { index: 'mvlist', text: 'MV', icon: 'icon-mvlist' },
      { index: 'artistlist', text: '歌手', icon: 'icon-artist' },
    ],
  },
  myMusic: {
    title: '我的音乐',
    items: [
      { text: '我喜欢的音乐', icon: '', index: 'like', color: '' },
      { text: '我的音乐云盘', icon: '', index: 'cloud-song', color: '' },
    ]
  },
  created: {
    title: '创建的歌单',
    items: [] as any[]
  },

}))

watchEffect(() => {
  if (userPlaylist.value.length) {
    const [like, ...created_playlist] = userPlaylist.value.map(({ name, id }, i) => {
      if (i === 0) {
        return {
          text: '我喜欢的音乐', icon: '',
          index: 'playlist-detail?' + new URLSearchParams({ name, id }),
          color: ''
        }
      } else {
        return {
          text: name, icon: 'icon-my',
          index: 'playlist-detail?' + new URLSearchParams({ name, id }),
          color: 'gray'
        }
      }
    })
    myMusic.value.items[0] = like
    created.value.items = created_playlist
  }
})


</script>

<template>
  <el-menu class="menu" :default-active="'index'" router @select="index => activeIndex = index">
    <el-menu-item-group :title="discover.title">
      <el-menu-item v-for="(item, index) in discover.items" :key="index" :index="item.index"
        :class="['menu-item', item.index === activeIndex && 'active-select']">
        <i :class="['iconfont', item.icon]" :style="{ color: item.color }"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
    </el-menu-item-group>

    <div v-if="loginStatus">
      <el-menu-item-group :title="myMusic.title">
        <el-menu-item v-for="(item, index) in myMusic.items" :key="index" :index="item.index"
          :class="['menu-item', item.index === activeIndex && 'active-select']">
          <i :class="['iconfont', item.icon]" :style="{ color: item.color }"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group :title="created.title">
        <el-menu-item v-for="(item, index) in created.items" :key="index" :index="item.index"
          :class="['menu-item', item.index === activeIndex && 'active-select']">
          <i :class="['iconfont', item.icon]" :style="{ color: item.color }"></i>
          <span class="name">{{ item.text }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </div>
    <div v-else class="unlogin">

      <el-link @click="setLoginCardVisible(true)" type="danger">登录查看个人歌单</el-link>
    </div>
  </el-menu>
</template>

<style scoped>
.menu {

  .unlogin {
    text-align: center;
    margin: 1rem 0;
  }

  .menu-item {
    height: 2.5rem;
    font-size: 0.8rem;

    /* overflow: hidden;
    text-overflow: ellipsis; */
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .iconfont {
      font-size: 1rem;
      padding-right: 0.5rem;
    }
  }



  .active-select {
    border-left: solid 0.3rem red;
  }
}
</style>
