<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import usePlayStateStore from '../../store/play_state_store'
const { addPlayList, updatePlayList } = usePlayStateStore()
defineProps<{
  songs: any[],
  listId: string
}>()
</script>

<template>
  <el-button @click="updatePlayList(songs, songs[0].id, listId)" style="padding: 0.6rem" size="small"
    color="var(--color-theme)" round>
    <i style="color: #fff;" class="iconfont icon-audio-play"></i>
    <span style="padding: 0 0.3rem;">播放全部</span>
    <el-icon title="仅添加到歌单" @click.stop="addPlayList(songs)" style="padding-left: 0.3rem;border-left: 1px solid #f67171;">
      <Plus />
    </el-icon>
  </el-button>
</template>

<style scoped lang="less"></style>