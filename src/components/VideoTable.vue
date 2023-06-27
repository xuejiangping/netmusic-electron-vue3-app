<script setup lang="ts">
const props = defineProps<{
    dataList: any[] | null
}>()
const formatedData = computed(() => {
    return props.dataList?.map(({ name, artistId, artistName, cover, duration, id, playCount, artists }) => ({
        artistId, artistName, cover: `${cover}?param=400y240`
        , duration, id, playCount, name,
        artists: artists.map(({ name: artistName, id }: { name: string, id: number }) => ({ artistName, id }))
    }))
});

</script>

<template>
    <!-- <div>VideoTable</div> -->
    <div class="grid-container">
        <router-link class="item" v-for="({ name, artists, cover, duration, playCount, id }, index) in formatedData"
            :key="index" :to="{ name: 'mvlist', query: { id, name } }">
            <div class="block">
                <el-image class="img" :src="cover" lazy />
                <span class="paly-count">{{ $utils.formartNum(playCount) }}</span>
                <span class="duration">{{ $utils.formatSongTime(duration) }}</span>
            </div>
            <div class="describe">
                <span class="title">{{ name }}</span>
                <span class="artist">
                    <router-link v-for="({ artistName, id }, i) in artists" v-split="[i, ' / ']"
                        :to="{ name: 'artistlist', query: { id, artistName } }">
                        <span>{{ artistName }}</span>
                    </router-link></span>
            </div>
        </router-link>
    </div>
</template>

<style scoped lang="less">
.grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    &:deep(.el-image__inner) {
        border-radius: 5%;
    }

    .item {
        // border: 1px solid;
        aspect-ratio: 4/3;

        .block {
            position: relative;
            font-size: 0.8rem;

            .paly-count,
            .duration {
                position: absolute;
                right: 0;
                color: #fff;
                z-index: 1;
                margin: 0.3rem;
            }

            .paly-count {
                top: 0;
            }

            .duration {
                bottom: 0;
            }
        }

        .describe {
            display: grid;
            grid-template-rows: 1fr 1fr;
            font-size: 0.7rem;
            row-gap: 0.2rem;

            // .title {}

            .artist {
                color: #cccccc;
            }
        }
    }
}
</style>