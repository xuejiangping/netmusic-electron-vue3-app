<script setup lang="ts">
const { $http, $store } = getCurrentInstance()?.proxy!
let props = withDefaults(defineProps<{
  dataList: any[],
  type: VideoTabelType,
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
    $http.listTracks({ id }).then(console.log)

  } else if (props.type === 'album') {
    $http.album({ id }).then(res => res.songs)
  }
  return false
}
console.log('$store', $store)

</script>

<template>
  <!-- <div>VideoTable</div> -->
  <div class="grid-container">
    <router-link v-for="({ artistName, name, artists, cover, duration, playCount, id }, index) in  dataList " :key="index"
      class="item" :to="{ name: routeName, query: { id, cover, name } }">

      <div class="block">
        <MyImage :is-album="type === 'album'" :src="cover"
          :aspect-ratio="aspect_ratio || (type === 'video' ? '16/10' : '1/1')">
        </MyImage>
        <span class=" paly-count">{{ playCount }}</span>
        <span class="duration">{{ duration }}</span>
        <span class="artist">{{ artistName }}</span>
        <i v-if="type !== 'singer'" title="" @click="play(id)" class="iconfont icon-play"
          :class="{ center: type === 'video' }"></i>
      </div>
      <div class="describe ">
        <span class="title  " v-title>{{ name }}</span>
        <span v-if="artists" class="artists ">
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

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: 1.5rem;



  .item {
    font-size: 0.7rem;

    &:hover {
      .block .icon-play {
        opacity: 1;
      }
    }

    .block {
      position: relative;
      .hover-scale-mixin;


      .paly-count,
      .duration,
      .artist,
      .icon-play {
        position: absolute;
        right: 0;
        color: #fff;
        z-index: 1;
        margin: 5px;
        // text-shadow: 0 0 0.6rem BLACK, 0 0 0.6rem red;
        .my-text-shadow();
      }




      .paly-count {
        top: 0;
      }

      .icon-play {
        bottom: 0.5rem;
        right: 0.5rem;
        opacity: 0;
        font-size: 2rem;
        transition: all 1s;


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
