<template>
	<view class="page-wrap">
		<uni-list>
			<uni-list-item v-for="item in list" 
				:title="item.name" 
				clickable 
				link
				:to="`/pages/brand/edit?id=${item._id}`"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			async getList() {
				const db = uniCloud.database()
				let obj = await db.collection('brand').get()
				let result = obj.result
				if (result.data) {
					this.list = result.data
				} else {
					uni.showModal({
						title: '报错',
						content: result.message
					})
				}
			}
		}
	}
</script>

<style>

</style>
