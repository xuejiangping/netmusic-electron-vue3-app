<script setup lang="ts">
const { $utils } = getCurrentInstance()!.appContext.config.globalProperties
defineProps<{
  dataList: Pick<AllProps, 'name' | 'trackCount' | 'creator' | 'id' | 'playCount' | 'img1v1Url'>[] | null
}>()



</script>

<template>
  <div>
    <router-link v-for="{ name, trackCount, creator, id, playCount, img1v1Url } in dataList"
      :to="{ name: 'playlist', query: { name, id } }">
      <ListItem :img1v1-url="img1v1Url">
        <span>{{ name }}</span>
        <span class="link-text">{{ trackCount }}首</span>
        <span class="link-text">by {{ creator.name }}</span>
        <template #right>
          <span class="link-text">播放：{{ $utils.formartNum(playCount) }}</span>
        </template>
      </ListItem>
    </router-link>
  </div>
</template>

<style scoped lang="less">
.link-text-color {
  color: #969696;
}
</style>
