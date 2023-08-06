<!--  -->
<script setup lang="ts">
const { $http, $utils, $store } = getCurrentInstance()?.proxy!

const { updatePlayList } = $store.usePlayStateStore()
const props = defineProps<{
  dataList: any[],
  type: ListType
}>()
watchEffect(() => {
  props.dataList.forEach(list => {
    $http.album({ id: list.id }).then(res => {
      list.tracks = $utils.formatList('songlist', res.songs)
    })
  })

})
</script>

<template>
  <div v-if="dataList" v-for="({ cover, name, tracks, id }) in dataList" class="item">
    <div class="l">
      <MyImage style="cursor: pointer;" @click="$router.push({
        name: 'album', query: { name, id }
      })" aspect-ratio="1/1" :src="cover" :is-album="type === 'album'"></MyImage>
    </div>
    <div class="r">
      <h3 class="title">
        <slot name="title">
          <div>
            <span>{{ name }}</span>
            <span class="action">
              <i title="播放列表" @click="updatePlayList(tracks, tracks[0].id, id)" class="iconfont icon-play"></i>

            </span>
          </div>
        </slot>
      </h3>
      <SongTable v-if="tracks" :list-id="String(id)" size="small" :show-header="false"
        :need-show-items="['index', 'title', 'duration', 'pop']" :data-list="tracks">
      </SongTable>
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  display: flex;
  margin-bottom: 2rem;
  column-gap: 3rem;

  .l {
    width: 25%;
  }

  .r {
    flex: 1;

    .title {
      margin: 1rem 0;

      .action {
        margin: 0 1rem;

        >* {
          padding: 0 1rem;
        }
      }
    }
  }
}
</style>
