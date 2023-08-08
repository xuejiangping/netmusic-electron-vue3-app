<script setup lang="ts">


const { $COMMON, $store } = getCurrentInstance()?.proxy!
const store = $store.usePlayStateStore()
const { updatePlayList, addSong, play } = store
const { curSongId, includedListIds } = storeToRefs(store)
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
  pop = '热度',
  '音乐标题' = 'name',
  '歌手' = 'artists',
  '专辑' = 'album',
  '时长' = 'duration',
  '热度' = 'pop'
}

/**
 * listId 当前列表所属哪个类型，如歌单：1231313 ，专辑：2314144,默认为0
 * needShowItems  渲染哪些 tableColums1 ,如： 'index', 'title', 'singer', 'album', 'duration'
 * dataList 包含歌曲信息的列表 
 */
const props = withDefaults(defineProps<{
  dataList: SongItem[],
  needShowItems?: ('index' | 'title' | 'singer' | 'album' | 'duration' | 'pop')[],
  listId?: string,
  size?: "" | "default" | "small" | "large",
  showHeader?: boolean,
}>(), {
  needShowItems: () => ['index', 'title', 'singer', 'album', 'duration', 'pop'],
  showHeader: true
})

// const curSongId = ref(0)


// 双击播放



function row_dbclick(row: SongItem) {

  /**
   * 一、 needUpdatePlayList 是一个系统设置 ，当在列表双击时是否替换当前整个播放列表
   * 若为是，则替换，若不是 则只添加当前 点击的歌曲到播放列表
   * 
   */

  const updatePlayListWhenDbClick = true
  const songId = row.id

  // 判断双击 是否更新播放列表，若不是则只添加歌曲到列表
  if (updatePlayListWhenDbClick && props.listId) { //listId 存在
    if (includedListIds.value.includes(props.listId)) {  // 当前歌单已添加到 播放列表，播放点击歌曲即可
      play(songId)
    } else {  // 歌单未添加到播放列表，更新歌单
      updatePlayList(props.dataList, songId, props.listId)
    }
  } else {
    addSong(row, true)
  }
}



</script>

<template>
  <el-table :flexible="true" :show-header="showHeader" :size="size" v-if="Boolean(dataList)" @row-dblclick="row_dbclick"
    @row-contextmenu="" class="table" :data="dataList" stripe highlight-current-row>

    <el-table-column width="50" v-if="needShowItems.includes('index')">
      <template #default="scope">
        <div class="col-1">
          <span v-if="curSongId === scope.row.id"><i class="active iconfont icon-playnum  "></i></span>
          <span v-else v-pad2="scope.$index"></span>
        </div>
      </template>
    </el-table-column>

    <el-table-column min-width="100" v-if="needShowItems.includes('title')" class-name="title" prop="name"
      :label="tableColums1.name">

      <template #default="scope">
        <div :class="{ active: scope.row.id === curSongId }" class="title" v-title>
          <span>
            <slot name="title-prefix" :song="(scope.row as SongItem)"></slot>
          </span>
          <span>{{ scope.row.name }}</span>
          <router-link v-if="scope.row.mv" :to="{ name: 'mv-detail', query: { id: scope.row.mv, name: scope.row.name } }">
            <i class=" iconfont icon-mv"></i></router-link>
          <i class="iconfont icon-vip" v-if="scope.row.fee === $COMMON.Fee.VIP歌曲"></i>
        </div>
      </template>
    </el-table-column>

    <el-table-column min-width="100" v-if="needShowItems.includes('singer')" prop="singer" :label="tableColums1.artists">
      <template #default="scope">
        <el-space direction='horizontal' spacer="/" :size="3">
          <router-link v-title v-for="(item) in scope.row.artists" :to="{ name: 'singer', query: item }">
            <span>{{ item.name }}</span>
          </router-link>
        </el-space>
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

    <el-table-column v-if="needShowItems.includes('duration')" prop="duration" :label="tableColums1.duration">
      <template #default="scope">
        {{ scope.row.duration }}
      </template>
    </el-table-column>
    <el-table-column v-if="needShowItems.includes('pop')" prop="pop" :label="tableColums1.pop">
      <template #default="scope">
        <el-progress color="pink" :show-text="false" :percentage="scope.row.pop" />
      </template>
    </el-table-column>


  </el-table>
</template>

<style scoped lang="less">
@import (reference) "@/assets/css/global.less";

.active {
  color: var(--color-theme);
  font-size: large;
  // background-color: rgb(234, 206, 206);
  font-weight: bold;
}


.table {
  font-size: 0.8rem;


  .col-1 {
    color: var(--color-text);
  }





  .title {
    >* {
      margin-right: 5px;
    }

    .icon-vip {
      font-style: italic;
      font-size: large;
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
