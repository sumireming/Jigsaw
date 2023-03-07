<template>
	<view class="page-wrap">
		<view class="wrap">
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
		</view>
		
	</view>
</template>

<script>
	import requestCloud from '../../utils/requestCloud.js'
	
	export default {
		data() {
			return {
				avatar: null,
				nickname: null
			}
		},
		methods: {
			async onChooseavatar (e) {
				this.avatar = e.detail.avatarUrl
			},
			
			async login () {
				// if (!this.avatar || !this.nickname) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请选择头像和昵称'
				// 	})
				// 	return
				// }
				let loginInfo = await this.wxLogin()
				if (loginInfo.code) {
					let code = loginInfo.code
					let avatar = await this.uploadAvatar()
					let token = await requestCloud({
						method: 'user.login',
						data: {
							code,
							avatar,
							nickname: this.nickname
						}
					})
					console.log(token)
					if (token) {
						uni.setStorageSync('token', token)
					}
					
				} else {
					console.error(loginInfo.errMsg)
				}
			},
			uploadAvatar () {
				return new Promise((resolve, reject) => {
					if (this.avatar) {
						uni.downloadFile({
							url: this.avatar,
							success: async (r) => {
								let filePath = r.tempFilePath
								let arr = filePath.split('/')
								let cloudPath = arr[arr.length - 1]
								let upload = await uniCloud.uploadFile({
									filePath,
									cloudPath: `user/${cloudPath}`
								})
								resolve(upload.fileID)
							}
						})
					}
				})
				
			},
			wxLogin () {
				return new Promise(r => {
					uni.login({
						complete: (res) => {
							r(res)
						}
					})
				})
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
