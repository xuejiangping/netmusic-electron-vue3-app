<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
const { $store } = getCurrentInstance()?.proxy!
const { addPlayList, updatePlayList } = $store.usePlayStateStore()

defineProps<{
  songs: any[],
  listId: string
}>()
</script>

<template>
  <div>
    <el-button class="btn" @click="updatePlayList(songs, songs[0].id, listId)" size="small" color="var(--color-theme)"
      round>
      <i style="color: #fff;" class="iconfont icon-audio-play"></i>
      <span>播放全部</span>

    </el-button>
    <el-button @click="addPlayList(songs, listId)" class="btn" type='success' size="small" round title="仅添加到歌单">
      <el-icon color="#fff">
        <Plus />
      </el-icon>
      <span>添加到播放列表</span>
    </el-button>
  </div>
</template>
 
<style scoped lang="less">
.btn {
  padding: 13px 0.8rem;
}
</style>