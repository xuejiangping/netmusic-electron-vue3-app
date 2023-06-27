<script setup lang="ts">
const props = defineProps<{
  dataList: any[] | null
}>()
const formatedData = computed(() => {
  return props.dataList?.map(({ name, img1v1Url, accountId, trans, id }) => {
    return {
      name, img1v1Url, id,
      accountId, trans
    }
  })
})

watch(() => props.dataList, () => console.log('dataList', props.dataList))

</script>

<template>
  <div>
    <router-link v-for="({ name, img1v1Url, trans, id, accountId }, index) in formatedData" :key="index"
      :to="{ name: 'artistlist', query: { id, accountId, name } }">
      <ListItem :img1v1-url="img1v1Url">
        <span><router-link :to="{ name: 'artistlist', query: { id, accountId, name } }">{{ name }}</router-link></span>
        <span v-if="!!trans"> ({{ trans }})</span>
        <template #right>
          121
        </template>
      </ListItem>
    </router-link>

  </div>
</template>

<style scoped lang="less"></style>
