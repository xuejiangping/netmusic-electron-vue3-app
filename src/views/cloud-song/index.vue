<script setup lang="ts">
const { $http, $utils } = getCurrentInstance()?.proxy!

const dataInfo = ref<{
  size: string, maxSize: string, count: number,
  list: SongItem[],
}>()

const formatSizeGB = (val: number) => (val / (1024 ** 3)).toPrecision(2)
$http.cloudSongs().then(({ size, maxSize, count, data }) => {
  dataInfo.value = {
    size: formatSizeGB(size),
    maxSize: formatSizeGB(maxSize), count,
    list: $utils.formatList('songlist', (<any[]>data).map((item: any) => item.simpleSong))
  }
})
const progress = computed(() => {
  const val = dataInfo.value
  if (val) {
    return +val.size / +val.maxSize * 100
  } return 0
})
</script>

<template>
  <div class="box" v-if="dataInfo">
    <h2> 我的音乐云盘</h2>
    <div class="volume"><span>云盘容量:</span>
      <el-progress :stroke-width="6" style="width: 30%;" :show-text="false" :percentage="progress" status="exception" />
      <span>{{ dataInfo.size }}G/{{ dataInfo.maxSize }}G</span>
      <span>歌曲永久保存，多端畅听</span>
    </div>
    <div> <play-all-btn :songs="dataInfo.list" list-id=""></play-all-btn> </div>
    <div style="margin-top: 1rem;">
      <song-table :need-show-items="['title', 'index', 'singer', 'album']" :data-list="dataInfo.list"></song-table>
    </div>
  </div>
</template> 

<style scoped lang="less">
.box {
  line-height: 3rem;
}

.volume {
  display: flex;
  color: var(--color-text);

  >* {
    padding-right: 1rem;
  }
}
</style>