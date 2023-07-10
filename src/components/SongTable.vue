<script setup lang="ts">

import usePlayStateStore from '../store/play_state_store'

const { currentPlayingSongId } = usePlayStateStore()
/**序号前补足两位 01 02   */
const vPad2 = (el: HTMLElement, binding: { value: string }) => {
  const val = binding.value
  el.textContent = String(val + 1).padStart(2, '0')
}


enum tableColums1 {
  name = '音乐标题',
  artists = '歌手',
  album = '专辑',
  duration = '时长',
  '音乐标题' = 'name',
  '歌手' = 'artists',
  '专辑' = 'album',
  '时长' = 'duration'
}

const props = withDefaults(defineProps<{
  dataList: SongItem[],
  needShowItems?: ('index' | 'title' | 'singer' | 'album' | 'duration')[]
}>(), {
  needShowItems: () => ['index', 'title', 'singer', 'album', 'duration']
})

// const currentPlayingSongId = ref(0)


// 双击播放



function row_dbclick(row: SongItem) {
  if (!row.id) return
  // currentPlayingSongId.value = row.id
  console.log('双击', { id: row.id, list: props.dataList })

}



</script>

<template>
  <el-table v-if="Boolean(dataList)" @row-dblclick="row_dbclick" class="table" :data="dataList" stripe
    highlight-current-row>

    <el-table-column v-if="needShowItems.includes('index')" width="100px">
      <template #default="scope">
        <div class="col-1">
          <span v-if="currentPlayingSongId === scope.row.id"><i class="active iconfont icon-audio-play"></i></span>
          <span v-else v-pad2="scope.$index"></span>
        </div>
      </template>
    </el-table-column>

    <el-table-column v-if="needShowItems.includes('title')" class-name="title" prop="name" :label="tableColums1.name">
      <template #default="scope">
        <div :class="{ active: scope.row.id === currentPlayingSongId }" class="title" v-title>
          <span>{{ scope.row.name }}</span>
          <router-link v-if="scope.row.mv" :to="{ name: 'mv-detail', query: { id: scope.row.mv, name: scope.row.name } }">
            <i class=" iconfont icon-mv"></i></router-link>
        </div>
      </template>
    </el-table-column>

    <el-table-column v-if="needShowItems.includes('singer')" prop="singer" :label="tableColums1.artists">
      <template #default="scope">
        <div class="singer" v-title>
          <router-link v-for="(item, i) in scope.row.artists" v-split="[i]" :to="{ name: 'singer', query: item }">
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </template>
    </el-table-column>

    <el-table-column v-if="needShowItems.includes('album')" prop="album" :label="tableColums1.album">
      <template #default="scope">
        <div class="album" v-title>
          <router-link :to="{ name: 'album', query: scope.row.album }">
            <span>{{ scope.row.album.name }}</span>
          </router-link>
        </div>
      </template>
    </el-table-column>

    <el-table-column width="120px" v-if="needShowItems.includes('duration')" prop="duration"
      :label="tableColums1.duration">

      <template #default="scope">
        {{ scope.row.duration }}
      </template>
    </el-table-column>



  </el-table>
</template>

<style scoped lang="less">
@import (reference) "@/assets/css/global.less";

.active {
  // background-color: yellow;
  color: var(--color-theme);
  font-size: large;
  font-weight: bold;
}


.table {
  font-size: 0.8rem;


  .col-1 {
    color: var(--color-text);
  }

  .singer,
  .title,
  .album {
    .multi-line(1)
  }

  .title {
    >* {
      margin-right: 5px;
    }

    i {
      color: var(--color-theme);
      font-size: inherit;
    }
  }
}

/* 
:deep(.title) {
  color: #4e7bac;
} */
</style>
