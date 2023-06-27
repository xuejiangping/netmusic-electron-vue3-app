<script setup lang="ts">
interface TableColumsProps {
  title: string,
  singer: string,
  album: string,
  duration: number
}
const vPad2 = (el: HTMLElement, binding: { value: string }) => {
  const val = binding.value
  el.textContent = String(val + 1).padStart(2, '0')
}

console.log(231)

enum tableColums1 {
  title = '音乐标题',
  singer = '歌手',
  album = '专辑',
  duration = '时长',
  '音乐标题' = 'title',
  '歌手' = 'singer',
  '专辑' = 'album',
  '时长' = 'duration'
}


const props = defineProps<{
  dataList: SongRecord[] | null
}>()
//格式化后的表格数据
const tableData = computed(() => props.dataList?.map(songData => ({
  id: songData.id,
  title: songData.name,
  singer: songData.singer?.map(({ name, id }) => ({ name, id })),
  album: { name: songData.album.name, id: songData.album.id },
  duration: songData.duration,
  url: songData.url
})))
// 双击播放

const play = (row: TableColumsProps) => console.log('play  ', row)


</script>

<template>
  <el-table v-if="Boolean(dataList)" @row-dblclick="play" class="table" :data="tableData" stripe>
    <el-table-column>
      <template #default="scope">
        <span v-pad2="scope.$index"></span>
      </template>
    </el-table-column>

    <el-table-column class-name="title" prop="title" :label="tableColums1.title"></el-table-column>
    <el-table-column prop="singer" :label="tableColums1.singer">
      <template #default="scope">
        <router-link v-for="(item) in scope.row.singer" :to="{ name: 'singer', query: item }">
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
    <el-table-column prop="duration" :label="tableColums1.duration"></el-table-column>



  </el-table>
</template>

<style scoped>
.table {
  font-size: 0.8rem;
}

/* 
:deep(.title) {
  color: #4e7bac;
} */
</style>
