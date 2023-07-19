<script setup lang="ts">
// const { IMG_SIZE_SEARCH_PARAMS } = getCurrentInstance()!.appContext.config.globalProperties.$COMMON
let props = withDefaults(defineProps<{
  dataList: any[],
  squar?: boolean,
  routeName?: string,
  isAlbum?: boolean,
}>(), {
  squar: false,
  routeName: 'index',
})

</script>

<template>
  <!-- <div>VideoTable</div> -->
  <div class="grid-container">
    <router-link v-for="({ artistName, name, artists, cover, duration, playCount, id }, index) in  dataList " :key="index"
      class="item" :to="{ name: routeName, query: { id, cover, name } }">

      <div class="block">
        <MyImage :is-album="isAlbum" :src="cover" :aspect-ratio="squar ? '1/1' : '16/10'">
        </MyImage>
        <span class=" paly-count">{{ playCount }}</span>
        <span class="duration">{{ duration }}</span>
        <span class="artist">{{ artistName }}</span>
      </div>
      <div class="describe ">
        <span class="title  text-in-oneline">{{ name }}</span>
        <span v-if="artists" class="artists text-in-oneline">
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


  &:deep(.el-image__inner) {
    border-radius: 5%;
  }

  .item {
    font-size: 12px;

    .block {
      position: relative;
      .hover-scale-mixin;

      .img {
        width: 100%;
      }

      .paly-count,
      .duration,
      .artist {
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
      }

      .artists {
        color: #cccccc;
      }
    }


  }

}
</style>
