<script setup lang="ts">
import getMV from '../../assets/js/index/new_mv'
const { $utils } = getCurrentInstance()!.appContext.config.globalProperties

const { mv_info } = getMV()

const cat = {
  地区: mv_info.mv_area,
  类型: mv_info.mv_type,
  排序: mv_info.mv_order
}
interface Parameter {
  label: keyof typeof cat,
  index: number
}
const checked = ({ label, index }: Parameter) => {
  if (label === '地区') return mv_info.mv_area_index === index
  if (label === '类型') return mv_info.mv_type_index === index
  if (label === '排序') return mv_info.mv_order_index === index
}
const change = ({ label, index }: Parameter) => {
  if (label === '地区') mv_info.mv_area_index = index
  else if (label === '类型') mv_info.mv_type_index = index
  else if (label === '排序') mv_info.mv_order_index = index
}
const dataList = computed(() => $utils.formatList('videolist', mv_info.mv_list, 'middle'))
// console.log('mv_info', mv_info)

</script>

<template>
  <Loading v-if="mv_info.mv_loading"></Loading>
  <div v-else>
    <ul class="cat">
      <li v-for="(data, label) in cat">
        <span>{{ label }}: </span>
        <el-check-tag type="info" size="small" :round="true" v-for="(item, index) in data"
          @click="() => change({ label, index })" :checked="checked({ label, index })">{{ item }}</el-check-tag>
      </li>
    </ul>
    <VideoTable route-name="mv-detail" :data-list="dataList"></VideoTable>
    <div class="pagination">
      <el-pagination small v-model:current-page="mv_info.currentPage" background layout="prev, pager, next"
        :total="mv_info.mv_count" />
    </div>
  </div>
</template>

<style scoped lang="less">
.cat {
  li {
    margin: 0.5rem 0;
  }
}

.box {
  margin: 1rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 2rem;
}
</style>
