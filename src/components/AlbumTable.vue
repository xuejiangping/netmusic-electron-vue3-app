<script setup lang="ts">
defineProps<{
    dataList: AlbumItem[]
}>()

</script>

<template>
    <div>
        <router-link v-for="({ cover, artists, name, id, alias }, index) in dataList" :key="index"
            :to="{ name: 'album', query: { name, id } }">
            <ListItem :img1v1-url="cover" type='album'>
                <div v-title>
                    <span>{{ name }}</span>
                    <span v-if="alias.length > 0">
                        ( <i v-for="(alia, i) in alias" v-split="[i, ' / ']" :key="index">{{ alia }}</i> )
                    </span>
                </div>
                <template #right>
                    <el-space spacer="/" :size="4" v-title :wrap="true">
                        <RouterLink v-for="({ id, name }) in artists" :to="{ name: 'singer', query: { name, id } }">
                            <span>{{ name }}</span>
                        </RouterLink>
                    </el-space>

                </template>

            </ListItem>
        </router-link>
    </div>
</template>

<style scoped lang="less"></style>