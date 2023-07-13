<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const router = useRouter()
// const $http = getCurrentInstance()?.appContext.config.globalProperties.$http
const { $message, $http, $utils } = getCurrentInstance()?.appContext.config.globalProperties!
const isOpen = ref(false)
const placeholder = ref('笑傲江湖')
const keywordsRaw = ref('')

const { suggestData, hots } = toRefs(reactive({
  suggestData: {},
  hots: [] as any[]
}))
const keywords = computed(() => keywordsRaw.value.trim())
// const searchHotList = ref(null)

function search(newKeywords: string) {
  if (newKeywords === '') {
    const otpion = {
      message: '搜索内容不能为空',
      type: 'warning',
      duration: 1000,
      offset: 100
    }
    return $message(otpion)
  }
  router.push({ name: 'search', query: { keywords: newKeywords } })
}



// console.group('searchHot')
// $http.searchHot().then(console.log)
// $http.searchHotDetail().then(console.log)
// console.groupEnd()

// console.group('serachSuggest')
// $http.serachMatch({ keywords: 'lol' }).then(console.log)
// $http.serachSuggest({ keywords: 'baby' }).then(console.log)
// console.groupEnd()
watch(isOpen, val => val && $http.searchHotDetail().then(({ data }) => hots.value = data))

async function getSuggestData(keywords: string) {
  if (keywords === '') return
  suggestData.value = (await $http.serachSuggest({ keywords })).result

}
const debounced_getSuggestData = $utils.debounce(getSuggestData, 1000)
watch(keywords, debounced_getSuggestData)
// const delayClose = () => setTimeout(() => isOpen.value = false, 100)
window.document.addEventListener('click', () => isOpen.value = false)
function a(b) { console.log(b) }
</script>

<template>
  <div class="search">
    <div>
      <el-input :input-style="{ color: '#fff' }" @change="a" @focus=" isOpen = true" size="small" class="input"
        @click.stop="" :prefix-icon="Search" @keydown.enter="search(keywords)" v-model="keywordsRaw"
        :placeholder="placeholder" clearable />

    </div>
    <div class="panel" v-show="isOpen">
      <el-card>
        <div v-if="keywords" class="suggest">
          建议
        </div>
        <div v-else class="hot">
          <div class="history">
            <h3 class="title">搜索历史</h3>
            <el-tag size="small" type="info" round class="tag" v-for="() in 5">安静</el-tag>
          </div>
          <div class="hot-list">
            <h3 class="title">热搜榜</h3>
            <ul>
              <li class="item" v-for="(item, i) in hots" @click="search(item.searchWord)">
                <div style="grid-row: 1/3;margin-right: 5rem;" :class="{ red: i < 3 }">{{ i + 1 }}</div>
                <div style="grid-row: 1/2;" class="name">
                  <span>{{ item.searchWord }}</span>
                  <span v-if="item.iconType" class="red"><i><b>hot</b></i></span>
                  <span style="color: var(--color-text-light);">{{ item.score }}</span>
                </div>
                <div v-title class="desc" style="grid-row: 2/3;">{{ item.content }}</div>
              </li>
            </ul>
          </div>


        </div>

      </el-card>

    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';

.red {
  color: var(--color-theme);
}

.search {
  position: relative;

  .input {
    flex: 1;
    padding: 0 16px;
    height: 28px;

    :deep(.el-input__wrapper) {
      border-radius: 20px;
      background-color: #e03e3e;
      box-shadow: none;
      color: #fff;
    }
  }

  .panel {

    position: absolute;
    top: 40px;
    max-width: 400%;
    min-width: 150%;
    min-height: 100px;
    overflow: scroll;
    max-height: 70vh;
    z-index: 4;
    font-size: 0.8rem;


    .hot {

      >div {
        margin-bottom: 1rem;
      }

      .history {
        .tag {
          margin: 2px;
        }
      }

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text);
        margin-bottom: 5px;
      }

      .item {
        display: grid;
        grid-template-rows: 2;
        grid-template-columns: 20px 1fr;
        column-gap: 0.5rem;
        row-gap: 0.2rem;
        align-items: center;
        margin: 10px 0;

        .name {
          >* {
            margin-right: 0.6rem;
          }
        }

        // line-height: 1rem;
        &:hover {
          background-color: var(--color-bg-main);
        }
      }
    }



  }
}
</style>
