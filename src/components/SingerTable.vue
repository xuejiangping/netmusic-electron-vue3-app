<script setup lang="ts">
defineProps<{
	dataList: SingerItem[]
}>()



	// watch(() => props.dataList, () => console.log('dataList', props.dataList))
</script>

<template>
	<div v-if="dataList">
		<router-link v-for="({ name, alias, cover, trans, id, accountId }, index) in dataList" :key="index"
			:to="{ name: 'singer', query: { id, accountId, name } }">
			<ListItem :img1v1-url="cover || ''">
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
