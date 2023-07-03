<script setup lang="ts">



interface TableColumsProps {
  name: string,
  singer: string,
  album: string,
  duration: number
}
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


defineProps<{
  dataList: Pick<AllProps, 'name' | 'id' | 'artists' | 'album' | 'duration' | 'audioUrl'>[]
}>()

// 双击播放

const play = (row: TableColumsProps) => console.log('play  ', row)


</script>

<template>
  <el-table v-if="Boolean(dataList)" @row-dblclick="play" class="table" :data="dataList" stripe>
    <el-table-column>
      <template #default="scope">
        <span v-pad2="scope.$index"></span>
      </template>
    </el-table-column>

    <el-table-column class-name="title" prop="name" :label="tableColums1.name"></el-table-column>
    <el-table-column prop="singer" :label="tableColums1.artists">
      <template #default="scope">
        <router-link v-for="(item) in scope.row.artists" :to="{ name: 'singer', query: item }">
          <i>{{ item.name }}</i>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="album" :label="tableColums1.album">
      <template #default="scope">
        <router-link :to="{ name: 'album', query: scope.row.album }">
          <i>{{ scope.row.album.name }}</i>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="duration" :label="tableColums1.duration">

      <template #default="scope">
        {{ scope.row.duration }}
      </template>
    </el-table-column>



  </el-table>
</template>

<style scoped lang="less">
@import (reference) "@/assets/css/global.less";

.table {
  font-size: 0.8rem;

  :deep(tr) {
    .hover-scale-mixin();

  }
}

/* 
:deep(.title) {
  color: #4e7bac;
} */
</style>
