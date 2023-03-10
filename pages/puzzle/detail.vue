<template>
	<view v-if="info">
		<image class="cover" mode="widthFix" :src="info.cover_url"></image>
		<view class="detail-wrap">
			<view class="section">
				<h1>{{info.name}}</h1>
			</view>
			<view class="section">
				<view>品牌： 
					<navigator 
						:url="`/pages/brand/detail?id=${info.brand_id}`" 
						class="link">
						{{info.brand_name}}
					</navigator>
				</view>
				<view v-if="info.pieces">片数： {{info.pieces}}</view>
			</view>
			<view class="section">
				<navigator :url="`/pages/puzzle/edit?id=${info._id}`">
					<view class="weak-link">更新拼图描述</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import requestCloud from '../../utils/requestCloud.js'
	
	export default {
		props: ['id'],
		data() {
			return {
				_id: null,
				info: null
			}
		},
		onLoad(param) {
			this._id = param.id
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			async getInfo () {
				let res = await requestCloud({
					method: 'puzzle.getPuzzleInfo',
					data: {id: this._id}
				})
				if (res.data) {
					this.info = res.data
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
	}
	
	.cover {
		width: 100%;
	}
	
	
</style>
