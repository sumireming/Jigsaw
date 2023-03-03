<template>
	<view class="wrap">
		<image class="cover" :src="data.cover_url"></image>
		<view>{{data.name}}</view>
		<view>{{data.brand_name}}</view>
	</view>
</template>

<script>
	export default {
		name:"PuzzleCard",
		props: ['data'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 300rpx;
		display: flex;
		flex-direction: column;
	}
	
	
</style>