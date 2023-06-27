<script setup lang="ts">
const props = defineProps<{
    dataList: any[] | null
}>()
const formatedData = computed(() => {
    return props.dataList?.map(({ name, picUrl, artist, alias, id }) => {
        return {
            name, picUrl, artist: { name: artist.name, id: artist.id }, alias, id
        }
    })
})
</script>

<template>
    <div>
        <router-link v-for="({ picUrl, artist, name, id, alias }, index) in formatedData" :key="index"
            :to="{ name: 'album', query: { name, id } }">
            <ListItem :img1v1-url="picUrl">
                <div>
                    <span>{{ name }}</span>
                    <span v-if="alias.length > 0">
                        ( <i v-for="(item, i) in alias" v-split="[i, ' / ']" :key="index">{{ item }}</i> )
                    </span>
                </div>
                <span>{{ artist.name }}</span>
            </ListItem>
        </router-link>
    </div>
</template>

<style scoped lang="less"></style>