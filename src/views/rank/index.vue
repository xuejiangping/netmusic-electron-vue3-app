<script setup lang="ts">
const { $http, $utils } = getCurrentInstance()?.proxy!
import usePlayStateStore from '../../store/play_state_store'
import { useGlobalPropsStore } from '../../store/global-props-store'


const { updatePlayList } = usePlayStateStore()
const { set_main_page_loading } = useGlobalPropsStore()
type RankItem = { tracks: SongItem[], trackIds: { ratio: string }[], coverImgUrl: string } & BaseProps

// $http.toplist().then(console.log)
// $http.topListDetail().then(console.log)
// $http.playlistdetail({ id: '19723756' }).then(console.log)
// $http.listTracks({ id: '19723756' }).then(console.log)
const { toplist } = toRefs(shallowReactive({
  toplist: [] as RankItem[]
}))
set_main_page_loading(true)
$http.toplist().then(res => { toplist.value = res.list })

/***********************官方榜 排行榜前4*************************/
const official_list = asyncComputed(async () => {
  const tasklist = toplist.value.filter((_, i) => i < 4).map(async item => {
    const tracks = await $http.listTracks({ id: item.id, limit: 5 }).then(item => item.songs)
    item.tracks = $utils.formatList('songlist', tracks)
    return item
  })
  const list = await Promise.all(tasklist)
  // console.log('list', list)
  // setTimeout(() => set_main_page_loading(false), 1000);
  set_main_page_loading(false)
  return $utils.formatList('ranklist', list, 'middle')
})
/***********************全球榜*************************/
const global_list = computed(() => $utils.formatList('ranklist', toplist.value.slice(4), 'middle'))
/** 使用watchEffect 定义的异步 计算属性 */
function asyncComputed<T>(asyncGetter: () => Promise<T>) {
  const _data = shallowRef<T>()
  watchEffect(async () => _data.value = await asyncGetter())
  return _data
}
// let src = 'https://i0.hdslb.com/bfs/face/f67a868b305e46b4af9326e5bce522426af36fa1.jpg@100w_100h.webp'
</script>

<template>
  <div v-if="official_list && official_list.length > 0">
    <div class="official">
      <h3>官方榜</h3>
      <div class="item" v-for="(item) in official_list">
        <div class="left">
          <RouterLink :to="{ name: 'playlist-detail', query: { name: item.name, id: item.id } }">
            <MyImage :lazy="false" :src="item.cover" aspect-ratio="1/1"></MyImage>
          </RouterLink>
        </div>
        <div class="right">
          <ul>
            <li v-for="(track, i) in item.tracks" @dblclick="updatePlayList(item.tracks, track.id, item.id)">
              <div class="l"><span v-topN="[i, 3]">{{ i + 1 }}</span>
                <span>{{ track.name }}</span>
                <span style="color: var(--color-text);">{{ }}</span>
              </div>
              <span class="r">
                <RouterLink v-for="({ name, id }, j) in track.artists" v-split="[j]"
                  :to="{ name: 'singer', query: { name, id } }">
                  {{ name }}
                </RouterLink>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="global">
      <h3>全球榜</h3>
      <div class="container">
        <VideoTable :data-list="global_list" route-name="playlist-detail" :squar="true"></VideoTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';

.official {
  .item {
    display: flex;
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow);
    font-size: 0.8rem;

    .left {
      flex: 1;
      margin-right: 2rem;
    }

    .right {

      flex: 3;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }

      li {
        display: flex;
        justify-content: space-between;
        line-height: 1.5rem;
        .hover-scale-mixin;

        .l {
          >* {
            margin: 0 0.3rem;
          }
        }
      }
    }
  }
}
</style>
