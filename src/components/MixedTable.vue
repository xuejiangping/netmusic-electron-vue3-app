<!--  -->
<script setup lang="ts">
import { Apple, Pear, Cherry } from '@element-plus/icons-vue'
import VideoTable from './VideoTable.vue'
import AlbumTable from './AlbumTable.vue'
import PictureListTable from './PictureListTable.vue'

// const { $http } = getCurrentInstance()?.proxy!
defineProps<{
  type: ListType,
  dataList: any[]
}>()
</script>

<template>
  <div v-if="dataList">
    <el-tabs class="tabs" type="card" tabPosition="right">
      <el-tab-pane>
        <template #label>
          <span title="图列模式">
            <Cherry style="width: 2rem;height: 2rem;" />
          </span>
        </template>
        <PictureListTable :type="type" :data-list="dataList"></PictureListTable>

      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span title="列表模式">
            <Pear style="width: 2rem;height: 2rem;" />
          </span>
        </template>
        <AlbumTable :type="type" :data-list="dataList"></AlbumTable>

      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span title="大图模式">
            <Apple title="" style="width: 2rem;height: 2rem;" />
          </span>
        </template>
        <VideoTable :type="type" :data-list="dataList"></VideoTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.tabs {
  &:deep(.el-tabs__item) {
    padding: 0;
  }
}
</style>
