<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	* { 
		margin: 0; 
		padding: 0; 
		font-family: Arial, Helvetica, sans-serif;
	}
	
	view {
		font-size: 24rpx;
	}
	
	button {
		box-sizing: border-box;
		border-radius: 8rpx;
		height: 80rpx;
		background: none;
		font-size: 28rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
	}
	
	button[type=primary] {
		background-color: $ipieces-primary-color;
	}
	
	button.button-hover[type=primary] {
		color: $ipieces-second-color;
		background-color: $ipieces-primary-color;
		opacity: 0.9;
	}
	
	.link {
		display: inline-block;
		text-decoration: underline;
		color: $ipieces-primary-color;
		font-weight: 400;
	}
	
	.tag {
		display: inline-block;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 44rpx;
		padding: 0 20rpx;
		margin-right: 16rpx;
		margin-bottom: 20rpx;
		color: $ipieces-text-light-grey;
		background-color: $ipieces-grey-bg-color;
		border-radius: 8rpx;
	}
	
	.tag.selected {
		background-color: $ipieces-second-color;
		border: 2rpx solid $ipieces-primary-color;
		color: $ipieces-primary-color;
	}
	
	.weak-link {
		display: inline-block;
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 20rpx 0;
		color: $ipieces-text-light-grey;
	}
	
	.page-wrap {
		margin: 0 30rpx;
		padding-bottom: 100rpx;
	}
	
	.section {
		padding: 30rpx 0;
		border-bottom: 2rpx solid $ipieces-border-color;
		font-size: 22rpx;
		line-height: 32rpx;
	}
	
	.section .title {
		font-size: 28rpx;
		line-height: 36rpx;
		color: $ipieces-text-color;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
</style>
