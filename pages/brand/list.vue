<template>
	<view class="page-wrap">
		<view class="header" v-if="regionList">
			<view class="tag"
				:class="{'selected': !currentRegion}"
				@click="currentRegion=null">全部</view>
			<view class="tag"
				v-for="region in regionList"
				:class="{'selected': currentRegion === region._id}"
				@click="currentRegion=region._id">{{region.name}}</view>
		</view>
		<uni-list>
			<uni-list-item v-for="item in list" 
				:title="item.name" 
				clickable 
				link
				:to="`/pages/brand/detail?id=${item._id}`"></uni-list-item>
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
	import { handleDBResult } from '../../utils/utils.js'
	
	export default {
		data() {
			return {
				list: [],
				regionList: null,
				currentRegion: null
			}
		},
		onShow() {
			this.getList()
		},
		async mounted() {
			this.getRegion()
		},
		watch: {
			currentRegion () {
				this.getList()
			}
		},
		methods: {
			gotoAdd () {
				uni.navigateTo({
					url: '/pages/brand/edit'
				})
			},
			async getRegion () {
				const puzzle = uniCloud.importObject('puzzle')
				try {
					let res = await puzzle.getRegionList()
					this.regionList = res.data
				} catch (e) {
					uni.showModal({
						title: '报错',
						content: JSON.stringify(e)
					})
				}
			},
			async getList() {
				const db = uniCloud.database()
				try {
					let condition = this.currentRegion ? {'region_id': this.currentRegion} : {}
					let obj = await db.collection('brand').where(condition).field('_id,name').get()
					let result = obj.result
					if (result.errCode === 0) {
						this.list = result.data
					} else {
						uni.showModal({
							title: '提示',
							content: result.errMsg
						})
					}
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: JSON.stringify(e)
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.header {
		padding: 40rpx 0 20rpx;
	}
</style>
