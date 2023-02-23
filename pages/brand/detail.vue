<template>
	<view v-if="info" class="page-wrap">
		<view class="header">
			<view class="logo-wrap">
				<image v-if="imageUrls.logo"
					:src="imageUrls.logo"
					class="brand-logo" mode="aspectFit"></image>
			</view>
			<view class="brand-name">
				<view class="name">{{info.name}}</view>
				<view class="othername" v-if="info.other_name">{{info.other_name.join('/')}}</view>
			</view>
		</view>
		<view class="section">
			<view v-if="info.region_name">国家/区域：{{info.region_name}}</view>
			<view v-if="info.founded_year">成立年：{{info.founded_year}}</view>
		</view>
		<view v-if="info.series && info.series.length > 0" class="section">
			<view class="title">系列</view>
			<view v-for="item in info.series" >
				<view class="link">{{item}}</view>
			</view>
		</view>
		<view v-if="info.breif" class="section">
			<view class="title">品牌简介</view>
			<view v-for="text in breifArr" style="margin-bottom: 16rpx;">{{text}}</view>
		</view>
		<navigator :url="`/pages/brand/edit?id=${info._id}`">
			<view class="weak-link">更新品牌描述</view>
		</navigator>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id: '',
				info: null,
				imageUrls: {
					logo: null
				}
			}
		},
		computed: {
			breifArr () {
				if (this.info && this.info.breif) {
					return this.info.breif.split(/\n/)
				}
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
				const db = uniCloud.database()
				try {
					let obj = await db.collection('brand').doc(this._id).get()
					let result = obj.result
					if (result.errCode === 0) {
						this.info = result.data[0]
						this.getImageUrl()
					}
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: JSON.stringify(e)
					})
				}
				
			},
			async getImageUrl () {
				try {
					if (this.info.logo) {
						let obj = await uniCloud.getTempFileURL({
							fileList: [this.info.logo]
						})
						if (obj.fileList[0]) {
							this.imageUrls.logo = obj.fileList[0].tempFileURL
						}
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

<style scoped lang="scss">
	.header {
		display: flex;
		flex-direction: row;
		padding: 30rpx 0;
	}
	
	.logo-wrap {
		width: 180rpx;
		height: 180rpx;
	}
	
	.brand-logo {
		width: 180rpx;
		height: 180rpx;
		border: 2rpx solid $ipieces-border-color;
		border-radius: $ipieces-border-radius;
	}
	
	.brand-name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}
	
	.brand-name .name {
		font-size: 36rpx;
		line-height: 36rpx;
		font-weight: 600;
	}
	
	.brand-name .othername {
		margin-top: 12rpx;
	}
	
	
	
</style>
