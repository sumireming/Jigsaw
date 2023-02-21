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
	* { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;}
	
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
	
	/*每个页面公共css */
	.page-wrap {
		margin: 0 30rpx;
	}
	
</style>
