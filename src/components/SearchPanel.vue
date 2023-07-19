<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const router = useRouter()
// const $http = getCurrentInstance()?.appContext.config.globalProperties.$http
const { $message, $http, $utils } = getCurrentInstance()?.appContext.config.globalProperties!
window.document.addEventListener('click', () => isOpen.value = false)
const SEARCH_HISTORY = 'searchHistory'

// window.addEventListener('unload', () => window.localStorage.setItem(SEARCH_HISTORY, JSON.stringify([...history.value])))
// const initedHistory = JSON.parse(window.localStorage.getItem(SEARCH_HISTORY) || 'null')

const initedHistory: string[] = $utils.localstorage.save_and_load(SEARCH_HISTORY, () => [...history.value])
const { isOpen, defaultKeywords, keywordsRaw, suggestData, hots, history } = toRefs(reactive({
  suggestData: null as any,
  keywordsRaw: '',
  defaultKeywords: '笑傲江湖',
  isOpen: false,
  hots: [] as any[],
  history: new Set<string>(initedHistory || ['浮生浪迹笑明月', '千愁散尽一剑轻'])
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
  isOpen.value = false
  history.value.add(newKeywords)

  router.push({ name: 'search', query: { keywords: newKeywords } })
}

/** 关键词 */
$http.searchDefaultKeywords().then(res => defaultKeywords.value = res.data.realkeyword)
// console.group('searchHot')
// $http.searchHot().then(console.log)
// $http.searchHotDetail().then(console.log)
// console.groupEnd()

// console.group('serachSuggest')
// $http.serachMatch({ keywords: 'lol' }).then(console.log)
// console.groupEnd()
watch(isOpen, val => val && $http.searchHotDetail().then(({ data }) => hots.value = data))

async function getSuggestData(keywords: string) {
  if (keywords === '') return
  suggestData.value = (await $http.serachSuggest({ keywords })).result

}
const debounced_getSuggestData = $utils.debounce(getSuggestData, 500)
watch(keywords, debounced_getSuggestData)
// const delayClose = () => setTimeout(() => isOpen.value = false

</script>

<template>
  <div class="search">
    <div>
      <el-input :input-style="{ color: '#fff' }" @focus=" isOpen = true" size="small" class="input" @click.stop
        :prefix-icon="Search" @keydown.enter="search(keywords)" v-model="keywordsRaw" :placeholder="defaultKeywords" />

    </div>
    <el-card shadow="always" class="panel" v-show="isOpen" @click.stop>
      <!-- 搜索建议 -->
      <div v-if="keywords && suggestData" class="suggest">
        <search-suggest :data="suggestData" @close="isOpen = false"></search-suggest>
      </div>
      <!-- 热搜榜 -->
      <div v-else class="hot">
        <div class="history">
          <h3 class="title"><span> 搜索历史 <i @click="history.clear(); $utils.localstorage.clear(SEARCH_HISTORY)"
                class="iconfont icon-del"></i></span>
            <span>查看全部</span>
          </h3>
          <el-tag v-for="(item) in history" @click="search(item)" size="small" type="info" round class="tag">{{ item }}
            <i class="iconfont icon-closed" @click.stop="history.delete(item)"></i></el-tag>
        </div>
        <div class="hot-list">
          <h3 class="title">热搜榜</h3>
          <ul>
            <li class="item" v-for="(item, i) in hots" @click="search(item.searchWord)">
              <div style="grid-row: 1/3;margin-right: 5rem;" :class="{ top3: i < 3 }">{{ i + 1 }}</div>
              <div style="grid-row: 1/2;" class="name">
                <span>{{ item.searchWord }}</span>
                <span v-if="item.iconType" style="color: red;"><i><b>hot</b></i></span>
                <span style="color: var(--color-text-light);">{{ item.score }}</span>
              </div>
              <div v-title class="desc" style="grid-row: 2/3;">{{ item.content }}</div>
            </li>
          </ul>
        </div>


      </div>

    </el-card>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';





.search {
  position: relative;
  font-size: 0.8rem;



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
    min-width: 280px;
    width: 30vw;
    overflow: scroll;
    max-height: 70vh;
    z-index: 4;

    .hot {
      >div {
        margin-bottom: 1rem;
      }

      .top3 {
        color: var(--color-theme);
        font-weight: bold;
        font-style: italic;
      }

      .history {
        .tag {
          position: relative;
          margin: 3px 5px;
          padding: 1px 13px 1px 11px;
          cursor: pointer;

          .iconfont {
            position: absolute;
            right: 1px;
            top: 23%;
            display: none;
            font-size: small;

          }

          &:hover i {
            display: block;
          }
        }

      }

      .title {
        display: flex;
        justify-content: space-between;
        color: var(--color-text);
        margin-bottom: 1rem;
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
