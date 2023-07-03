<script setup lang="ts">
defineProps<{
	dataList: Pick<AllProps, 'alias' | 'accountId' | 'id' | 'img1v1Url' | 'name' | 'trans'>[] | null
}>()



	// watch(() => props.dataList, () => console.log('dataList', props.dataList))
</script>

<template>
	<div>
		<router-link v-for="({ name, alias, img1v1Url, trans, id, accountId }, index) in dataList" :key="index"
			:to="{ name: 'artistlist', query: { id, accountId, name } }">
			<ListItem :img1v1-url="img1v1Url">
				<router-link :to="{ name: 'artistlist', query: { id, accountId, name } }">
					<span>{{ name }}</span>

					<span v-for="(alia) in alias">({{ alia }})</span>
				</router-link>

				<span v-if="!!trans"> ({{ trans }})</span>
				<template #right> 121 </template>
			</ListItem>
		</router-link>
	</div>
</template>

<style scoped lang="less"></style>
