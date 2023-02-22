<template>
	<view class="page-wrap">
		<uni-list>
			<uni-list-item v-for="item in list" 
				:title="item.name" 
				clickable 
				link
				:to="`/pages/brand/edit?id=${item._id}`"></uni-list-item>
		</uni-list>
		<uni-fab horizontal="right"
			vertical="bottom"
			:pattern="{
				buttonColor: '#000000'
			}"
			@fabClick="gotoAdd"></uni-fab>
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
			gotoAdd () {
				uni.navigateTo({
					url: '/pages/brand/edit'
				})
			},
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
