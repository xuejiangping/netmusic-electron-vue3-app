<script setup lang="ts">
const { IMG_SIZE_SEARCH_PARAMS } = getCurrentInstance()!.appContext.config.globalProperties.$COMMON
const props = withDefaults(defineProps<{
  dataList: any[] | null,
  squar?: boolean,
  routeName?: string
}>(), {
  dataList: null,
  squar: false,
  routeName: 'index'
})


// const pathName = computed(() => props.type || 'mvlist')
const formatedData = computed(() => {
  return props.dataList?.map(({ name, artistId, artistName, cover, duration, id, playCount, artists }) => ({
    artistId, artistName,
    cover: cover + IMG_SIZE_SEARCH_PARAMS.rect.middle,
    duration, id, playCount, name,
    artists: artists?.map(({ name: artistName, id }: { name: string; id: number }) => ({ artistName, id })),
  }))
});
const imgStyle = computed(() => ({ 'aspect-ratio': props.squar ? '1/1' : 'unset' }))

</script>

<template>
  <!-- <div>VideoTable</div> -->
  <div class="grid-container ">

    <router-link v-for="({ artistName, name, artists, cover, duration, playCount, id }, index) in formatedData"
      :key="index" class="item" :to="{ name: routeName, query: { id, name } }">
      <div class="block">
        <el-image class="img" :style="imgStyle" :src="cover" lazy />
        <span class="paly-count">{{ $utils.formartNum(playCount) }}</span>
        <span class="duration">{{ $utils.formatSongTime(duration) }}</span>
        <span class="artist">{{ artistName }}</span>

      </div>
      <div class="describe ">
        <span class="title  text-in-oneline">{{ name }}</span>
        <span class="artists text-in-oneline">
          <router-link v-for=" ({ artistName, id }, i) in artists" v-split="[i, ' / ']"
            :to="{ name: 'artistlist', query: { id, artistName } }">
            <span>{{ artistName }}</span>
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
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));

  gap: 16px;
  margin: 1rem 0;

  &:deep(.el-image__inner) {
    border-radius: 5%;
  }

  .item {
    .hover-scale-mixin();
    font-size: 12px;

    .block {
      position: relative;

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

      .artists {
        color: #cccccc;
      }
    }


  }

}
</style>
