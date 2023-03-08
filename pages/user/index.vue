<template>
	<view class="page-wrap">
		<Login>
			<template>123</template>
			<template v-slot:register>
				<button type="primary">呼起登录</button>
			</template>
		</Login>
		<!-- <view class="wrap">
			<button class="avatar-wrap" 
				open-type="chooseAvatar" 
				@chooseavatar="onChooseavatar">
					<image class="avatar" :src="avatar" mode="aspectFill"></image>
			</button>
			<view class="nickname-wrap">
				<input type="nickname" class="input weui-input"
					v-model="nickname"
					placeholder="请输入昵称"
				/>
			</view>
			
			<view class="action">
				<button type="primary" @click="login">一键登录</button>
				
			</view>
		</view> -->
		
	</view>
</template>

<script>
	import Login from '../../components/Login.vue'
	
	export default {
		components: { Login },
		data() {
			return {
			}
		},
		methods: {
			login () {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	button.avatar-wrap {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		border: none;
		background-color: $ipieces-grey-bg-color;
		display: block;
		position: relative;
	}
	
	
	.avatar {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 160rpx;
		height: 160rpx;
	}
	
	.nickname-wrap {
		margin-top: 30rpx;
	}
	
	.nickname-wrap input {
		width: 200rpx;
		font-size: 28rpx;
		line-height: 36rpx;
		height: 36rpx;
		text-align: center;
		border-bottom: 1rpx solid $ipieces-grey-bg-color;
	}
	
	.action {
		width: 100%;
		margin-top: 90rpx;
	}
	
	
</style>
