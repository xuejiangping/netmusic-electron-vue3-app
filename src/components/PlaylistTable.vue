<script setup lang="ts">
defineProps<{
  dataList: Pick<AllProps, 'name' | 'trackCount' | 'artistName' | 'artistId' | 'id' | 'playCount' | 'cover'>[] | null
}>()



</script>

<template>
  <div>
    <router-link v-for="{ name, trackCount, artistName, artistId, id, playCount, cover } in dataList"
      :to="{ name: 'playlist-detail', query: { name, id } }">
      <ListItem :img1v1-url="cover">
        <span>{{ name }}</span>
        <span class="link-text">{{ trackCount }}首</span>
        <RouterLink :to="{ name: 'index', query: { name: artistName, id: artistId } }">
          <span class="link-text">by {{ artistName }}</span>
        </RouterLink>
        <template #right>
          <span class="link-text">播放：{{ playCount }}</span>
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
