<script setup lang="ts">

// import { Cloudy } from '@element-plus/icons-vue'

const { $store } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { userPlaylist, loginStatus, } = storeToRefs(store)
const { setLoginCardVisible } = store
const route = useRoute()
const activeIndex = ref('index')
const menu = reactive({
  discover: {
    title: '',
    items: [
      { index: 'index', text: '发现音乐', icon: 'icon-index' },
      { index: 'rank', text: '排行榜', icon: 'icon-rank' },
      { index: 'playlist', text: '歌单', icon: 'icon-playlist' },
      { index: 'mvlist', text: 'MV', icon: 'icon-mvlist' },
      { index: 'artistlist', text: '歌手', icon: 'icon-artist', },
    ],
  },
  myMusic: {
    title: '我的音乐',
    items: [
      { text: '我喜欢的音乐', icon: '', index: 'like' },
      { text: '我的音乐云盘', icon: '', index: 'cloud-song' },
    ]
  },
  created: {
    title: '创建的歌单',
    items: [] as any[]
  },

})

// console.log('menu', menu)

watchEffect(() => {
  if (userPlaylist.value.length) {
    const [like, ...created_playlist] = userPlaylist.value.map(({ name, id }, i) => {
      return {
        text: name, icon: i === 0 ? '' : 'icon-my',
        index: 'playlist-detail?' + new URLSearchParams({ name, id }),
      }
    })
    menu.myMusic.items[0] = like
    menu.created.items = created_playlist
  }
})

watchEffect(() => activeIndex.value = route.fullPath)

</script>

<template>
  <el-menu class="menu" :default-active="'index'" router>
    <el-menu-item-group v-for="(menu_item, nenukey) in menu" v-show="nenukey === 'discover' || loginStatus"
      :title="menu_item.title">
      <el-menu-item v-if="menu_item.items.length" v-for="({ text, icon, index, icon_color } ) in menu_item.items"
        :index="index" :class="['menu-item', '/' + index === $route.fullPath && 'active-select']">
        <i :class="['iconfont', icon]" :style="{ color: icon_color }"></i>
        <span class="name">{{ text }}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
  <div v-if="!loginStatus" class="unlogin">
    <el-link class="link" @click="setLoginCardVisible(true)" type="info">登录后查看个人歌单</el-link>
  </div>
</template>

<style scoped>
.unlogin {
  text-align: center;
  margin: 1rem 0;

  .link {
    font-size: 1rem;

  }
}

.menu {
  font-weight: 600;

  .menu-item {
    height: 2.5rem;
    font-size: 0.9rem;
    color: unset;

    .iconfont {
      color: gray;
    }

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
    border-left: solid 0.3rem var(--color-theme);
    color: var(--color-theme);
  }
}
</style>
