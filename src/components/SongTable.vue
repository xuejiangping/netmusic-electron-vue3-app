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
        <div class="col-1">
          <span v-pad2="scope.$index"></span>
        </div>
      </template>
    </el-table-column>

    <el-table-column class-name="title" prop="name" :label="tableColums1.name"></el-table-column>
    <el-table-column prop="singer" :label="tableColums1.artists">
      <template #default="scope">
        <div class="singer">
          <router-link v-for="(item, i) in scope.row.artists" v-split="[i]" :to="{ name: 'singer', query: item }">
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="album" :label="tableColums1.album">
      <template #default="scope">
        <router-link :to="{ name: 'album', query: scope.row.album }">
          <span>{{ scope.row.album.name }}</span>
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

  :deep(tbody tr) {
    .hover-scale-mixin();
  }

  .col-1 {
    color: var(--color-text);
  }

  .singer {
    .multi-line(2)
  }
}

/* 
:deep(.title) {
  color: #4e7bac;
} */
</style>
