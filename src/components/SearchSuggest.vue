<script setup lang="ts">

const { $utils, $http, $store } = getCurrentInstance()?.proxy!
const { addSong } = $store.usePlayStateStore()

type Key = Exclude<keyof SuggestData, 'order'>
type SuggestData = {
  albums?: AlbumItem[],
  artists?: SingerItem[],
  order: Key[],
  playlists: PlaylistItem[],
  songs?: SongItem[]
}

const props = defineProps<{
  data: SuggestData
}>()
enum cat {
  单曲 = 'songs',
  歌手 = 'artists',
  专辑 = 'albums',
  歌单 = 'playlists',
  'songs' = '单曲',
  'artists' = '歌手',
  'albums' = '专辑',
  'playlists' = '歌单',
}
const icons_className = {
  [cat.歌单]: 'icon-playlist',
  [cat.单曲]: 'icon-playsong',
  [cat.歌手]: 'icon-artist',
  [cat.专辑]: 'icon-fav'
}

const formatedData = computed(() => {
  return props.data.order?.map(key => ({
    data: props.data[key], title: cat[key],
    icon: icons_className[key], key
  }))
})
const router = useRouter()

async function handleClick(key: Key, data: BaseProps) {
  switch (key) {
    case cat.专辑:
      router.push({ name: 'album', query: { ...data } })
      break;
    case cat.单曲:
      const song = (await $http.songDetail({ ids: data.id }).then(res => $utils.formatList('songlist', res.songs)))[0]
      // debugger
      addSong(song, true)
      break;
    case cat.歌单:
      router.push({ name: 'playlist-detail', query: { ...data } })
      break;
    case cat.歌手:
      router.push({ name: 'singer', query: { ...data } })
      break;
  }
  // console.log(key, data)
}
const emit = defineEmits(['close'])
</script>

<template>
  <div class="box">
    <div v-for="item1 in formatedData" class="item">
      <h4 class="title"> <span><i class="iconfont" :class="item1.icon"></i> {{ item1.title }}</span></h4>
      <ul>
        <li v-title v-for="(item2) in item1.data" @click="handleClick(item1.key, item2); emit('close')"
          class="text-in-oneline"><span class="name">{{ item2.name }}</span>
          <span v-if="item1.key === 'songs'" class="artist"> - {{ (<SongItem>item2).artists[0].name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@bottom-gap: 6px;

.box {

  .iconfont {
    color: var(--color-theme);
    padding-right: -@bottom-gap;
  }

  .item {
    margin-bottom: @bottom-gap;

    .title {
      margin-bottom: @bottom-gap*1.5;

    }

    li {
      padding: 0 @bottom-gap*3;
      line-height: @bottom-gap*5;

      &:hover {
        background-color: var(--color-bg-main);
      }
    }
  }
}
</style>