<script setup lang="ts">
const { $http, $utils, $utils2, $store } = getCurrentInstance()?.proxy!
const { updatePlayList } = $store.usePlayStateStore()
type RankItem = { tracks: SongItem[], trackIds: { ratio: string }[], coverImgUrl: string } & BaseProps

// $http.toplist().then(console.log)
// $http.topListDetail().then(console.log)
// $http.playlistdetail({ id: '19723756' }).then(console.log)
// $http.listTracks({ id: '19723756' }).then(console.log)
const { toplist } = toRefs(shallowReactive({
  toplist: [] as RankItem[]
}))
$http.toplist().then(res => toplist.value = res.list)
/***********************官方榜 排行榜前4*************************/
const official_list = asyncComputed(async () => {
  const tasklist = toplist.value.filter((_, i) => i < 4).map(item => {
    return $http.listTracks({ id: item.id, limit: 5 })
      .then(item => item.songs)
      .then(tracks => (item.tracks = $utils.formatList('songlist', tracks), item))
  })
  // console.log('tasklist', tasklist)
  return $utils.formatList('ranklist', await $utils2.loading(tasklist), 'middle')
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
      <h3 class="title">官方榜</h3>
      <div class="item" v-for="(item) in official_list">
        <div class="left">
          <RouterLink :to="{ name: 'playlist-detail', query: { name: item.name, id: item.id } }">
            <MyImage :lazy="false" :src="item.cover" aspect-ratio="1/1"></MyImage>
          </RouterLink>
        </div>
        <div class="right">
          <ul>
            <li v-for="(track, i) in item.tracks" @dblclick="updatePlayList(item.tracks, track.id, item.id)">
              <div class="l" v-title><span v-topN="[i, 3]">{{ i + 1 }}</span>
                <span>{{ track.name }}</span>
                <!-- <span style="color: var(--color-text);">{{ }}</span> -->
              </div>
              <span class="r" v-title>
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
      <h3 class="title">全球榜</h3>
      <div class="container">
        <VideoTable :data-list="global_list" type='playlist'></VideoTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/css/global.less';

.title {
  font-size: 2rem;
  margin: 2rem 0;
}

.official {

  .item {
    font-size: 0.9rem;
    display: flex;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: var(--el-box-shadow);

    .left {
      flex: 1;
    }

    .right {

      flex: 3;

      ul {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        padding: 0 2rem;
      }

      li {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .hover-scale-mixin;
        row-gap: 1rem;

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
