<script setup lang="ts">
const { $utils } = getCurrentInstance()!.appContext.config.globalProperties
const props = defineProps<{
  dataList: any[] | null
}>()

const formatedData = computed(() => {
  return props.dataList?.map(({ id, creator, name, userId, playCount, trackCount, coverImgUrl, bookCount }) => ({
    name,
    userId,
    trackCount,
    coverImgUrl,
    bookCount,
    playCount,
    creator: { id: creator.userId, name: creator.nickname },
    id,
  }))
})
</script>

<template>
  <div>
    <router-link v-for="{ name, trackCount, creator, id, playCount, coverImgUrl } in formatedData" :to="{ name: 'playlist', query: { name, id } }">
      <ListItem :img1v1-url="coverImgUrl">
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
