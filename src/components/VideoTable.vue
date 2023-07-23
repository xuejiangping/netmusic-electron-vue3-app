<script setup lang="ts">
const { $http, $store, $utils } = getCurrentInstance()?.proxy!
const { updatePlayList } = $store.usePlayStateStore()
let props = withDefaults(defineProps<{
  dataList: any[],
  type: ListType,
  aspect_ratio?: string
}>(), {})
const routeName = computed(() => {
  switch (props.type) {
    case 'singer':
      return 'singer'
      break
    case 'album':
      return 'album'
      break
    case 'playlist':
      return 'playlist-detail'
      break
    case 'video':
      return 'mv-detail'
      break
    default:
      return 'index'
  }
})
function play(id: string) {
  if (props.type === 'playlist') {
    $http.listTracks({ id })
      .then(res => $utils.formatList('songlist', res.songs))
      .then(songs => updatePlayList(songs, songs[0].id, id))

  } else if (props.type === 'album') {
    $http.album({ id })
      .then(res => $utils.formatList('songlist', res.songs))
      .then(songs => updatePlayList(songs, songs[0].id, id))
  }
  return false
}

</script>

<template>
  <!-- <div>VideoTable</div> -->
  <div class="grid-container" :class="[type === 'video' ? 'grid-columns-rect' : 'grid-columns-squar']">
    <router-link v-for="({ artistName, name, artists, cover, duration, playCount, id, isOfficial }, index) in  dataList "
      :key="index" class="item" :to="{ name: routeName, query: { id, cover, name } }">

      <div class="block">
        <MyImage :is-album="type === 'album'" :src="cover"
          :aspect-ratio="aspect_ratio || (type === 'video' ? '16/10' : '1/1')">
        </MyImage>
        <span class=" paly-count">{{ playCount }}</span>
        <span class="duration">{{ duration }}</span>
        <span v-if="artistName && type === 'playlist'" class="artist"><i v-if="isOfficial"
            class="iconfont icon-artist"></i>
          {{ artistName }}</span>
        <span class="iconPlay">
          <i v-if="type === 'video'" class=" center iconfont icon-video-play"></i>
          <i v-else-if="type !== 'singer'" @click.prevent="play(id)" class=" iconfont icon-play"></i>
        </span>
      </div>
      <div class=" describe ">
        <span class=" title" v-title>{{ name }}</span>
        <span v-if="artists" v-title class="artists ">
          <router-link v-for=" ( { name, id }, i ) in  artists " v-split="[i, ' / ']"
            :to="{ name: 'singer', query: { id, name, cover } }">
            <span>{{ name }}</span>
          </router-link></span>
      </div>

    </router-link>
  </div>
</template>

<style scoped lang="less">
@import (reference) "@/assets/css/global.less";

.grid-columns-rect {
  grid-template-columns: repeat(auto-fit, minmax(11rem, 31%));
}

.grid-columns-squar {
  grid-template-columns: repeat(auto-fit, minmax(8rem, 22%));
}

.grid-container {
  width: 100%;
  display: grid;
  gap: 1.2rem;

  .item {
    font-size: 0.7rem;

    &:hover {
      .block .iconPlay {
        opacity: 1;
      }
    }

    .block {
      position: relative;
      .hover-scale-mixin;

      .paly-count,
      .duration,
      .artist,
      .iconPlay {
        position: absolute;
        right: 0;
        color: #fff;
        z-index: 1;
        margin: 5px;
        text-shadow: 0 0 0.6rem BLACK, 0 0 0.6rem red;
      }

      .artist {
        i {
          color: yellow;
          font-size: 0.7rem;
        }
      }


      .paly-count {
        top: 0;
      }

      .iconPlay {
        bottom: 0.5rem;
        right: 0.5rem;
        opacity: 0;
        transition: all 1s;

        .iconfont {
          font-size: 2rem;
          color: #fff;

        }
      }

      .center {
        bottom: 50%;
        right: 50%;
        transform: translate(60%, 60%);
      }

      .duration {
        bottom: 0;
      }

      .artist {
        left: 0;
        bottom: 0;
      }
    }

    .describe {
      display: grid;
      grid-template-rows: 1fr 1fr;
      row-gap: 2px;

      .title {
        color: var(--color-text-main);
        .text-in-oneline
      }

      .artists {
        color: #cccccc;
        .text-in-oneline
      }
    }


  }

}
</style>
