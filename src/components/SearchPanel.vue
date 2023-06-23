<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const router = useRouter()
// const $http = getCurrentInstance()?.appContext.config.globalProperties.$http
const keyword = ref('')

const isOpen = ref(false)
const placeholder = ref('占位符')
// const searchHotList = ref(null)
const handleChange = (keyword: string) => {
  keyword = keyword.trim()
  if (keyword === '') return
  router.push({ name: 'search', query: { keyword } })
}

interface PanelDataRaw {
  title: string,
  items: string[]
}

const panelData = ref<PanelDataRaw[]>([
  {
    title: '热搜',
    items: ['agag', 'iigaig']
  }
])
panelData.value?.push({
  title: '热搜121',
  items: ['agag', 'iigaig']
})



</script>

<template>
  <div class="search">
    <el-input @focus="() => isOpen = true" @blur="() => isOpen = false" size="small" class="input" :prefix-icon="Search"
      @change="handleChange" v-model="keyword" :placeholder="placeholder" clearable />
    <div class="panel" v-show="isOpen">
      <el-card>
        <div v-for="(item, index) in panelData" :key="index">
          <div class="header">{{ item.title }}</div>
          <div v-for="(item2, index2) in item.items" :key="index2" class="text item">{{ item2 }}</div>
        </div>

      </el-card>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.search {
  position: relative;

  .input {
    flex: 1;
    padding: 0 1rem;
    height: 1.5rem;

    :deep(.el-input__wrapper) {
      border-radius: 20px;
    }
  }

  .panel {

    position: absolute;
    top: 130%;
    width: 120%;
    min-height: 100px;
    overflow: scroll;
    max-height: 80vh;
    z-index: 9;



    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      padding: 0.6rem 0;
      color: #999999;
      margin-left: -5px;
    }


    .item {
      line-height: 1.5rem;

      &:hover {
        background-color: #f2f2f2;

      }
    }


  }
}
</style>
