<template>
	<navigator v-if="info" :url="`/pages/puzzle/detail?id=${info._id}`">
		<view class="wrap">
			<image class="cover" mode="widthFix" :src="info.cover_url"></image>
			<view class="title">{{info.name}}</view>
			<view class="subtitle">
				{{info.brand_name}}
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"WaterFallItem",
		props: ['info'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 345rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 40rpx;
		position: relative;
	}
	
	.cover {
		width: 345rpx;
		border-radius: 8rpx;
		margin-bottom: 18rpx;
	}
	
	.title {
		font-size: 28rpx;
		line-height: 32rpx;
		color: $ipieces-primary-color;
		font-weight: 600;
		word-break: break-all;
	}
	
	.subtitle {
		font-size: 24rpx;
		line-height: 24rpx;
		color: $ipieces-text-grey;
		margin-top: 12rpx;
	}
</style>