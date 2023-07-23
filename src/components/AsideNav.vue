<script setup lang="ts">

const { activeIndex, asideDirs } = toRefs(reactive({
  activeIndex: 'index',
  asideDirs: {
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
    myMusic: { title: '我的音乐', items: [{ text: '我喜欢的音乐', icon: 'icon-my', index: 'like' }] },
  }
}))


</script>

<template>
  <el-menu class="menu" :default-active="'index'" router @select="index => activeIndex = index">
    <el-menu-item-group v-for="(value, key) in asideDirs" :key="key" :title="value.title">
      <el-menu-item v-for="(item, index) in value.items" :key="index" :index="item.index"
        :class="['menu-item', item.index === activeIndex && 'active-select']">
        <i :class="['iconfont', item.icon]"></i>
        <span style="padding-left: 0.5rem">{{ item.text }}</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<style scoped>
.menu-item {
  height: 2.5rem;
  font-size: 0.8rem;

  .iconfont {
    font-size: 1rem;
  }
}



.active-select {
  border-left: solid 0.5vw red;
}
</style>
