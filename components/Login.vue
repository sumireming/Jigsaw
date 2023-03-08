<template>
	<view>
		<template v-if="isLogin">
			<!-- 登录状态显示的内容 -->
			<slot></slot>
		</template>
		<template>
			<view class="login-button" @click="open">
				<!-- 未登录状态显示的内容 -->
				<slot name="register" ></slot>
			</view>
		</template>
		<uni-popup ref="loginPopup" type="bottom">
			<view class="wrap">
				<view class="title">请选择头像和昵称</view>
				<button class="avatar-wrap"
					open-type="chooseAvatar" 
					@chooseavatar="onChooseavatar" >
						<image v-if="avatar" class="avatar" :src="avatar" mode="aspectFill"></image>
						<uni-icons v-else class="empty-icon" type="camera-filled" size="32" color="#000000"></uni-icons>
				</button>
				<view class="nickname-wrap">
					<input type="nickname" class="input weui-input"
						v-model="nickname"
						placeholder="请输入昵称"
						placeholder-class="placeholder"
					/>
				</view>
				
				<view class="action">
					<button type="primary" @click="login">微信授权登录</button>
					
				</view>
			</view>
		</uni-popup>
	</view>
	
	
</template>

<script>
	import requestCloud from '../utils/requestCloud.js'
	export default {
		name:"Login",
		data() {
			return {
				isLogin: Boolean(uni.getStorageSync('token')),
				avatar: null,
				nickname: null
			}
		},
		mounted() {
			
			uni.$on('slientLoginSuccess', () => {
				this.isLogin = true
			})
			
			uni.$on('loginSuccess', () => {
				this.isLogin = true
			})
			
			
			
			this.init()
		},
		methods: {
			async init () {
				if (!this.isLogin) {
					let loginInfo = await this.wxLogin()
					if (loginInfo.code) {
						console.log(loginInfo.code)
						let res = await requestCloud({
							method: 'user.slientLogin',
							data: {
								code: loginInfo.code
							}
						})
						
						
						if (res && res.token) {
							uni.setStorageSync('token', res.token)
							this.isLogin = true
							
							uni.$emit('slientLoginSuccess')
						} else {
							console.log('新用户')
						}
					}
				}
			},
			open () {
				this.$refs.loginPopup.open()
			},
			async onChooseavatar (e) {
				this.avatar = e.detail.avatarUrl
			},
			async login () {
				if (!this.avatar || !this.nickname) {
					uni.showToast({
						icon:"none",
						title: '请选择头像和昵称'
					})
					return
				}
				
				let loginInfo = await this.wxLogin()
				if (loginInfo.code) {
					let code = loginInfo.code
					let avatar = await this.uploadAvatar()
					let res = await requestCloud({
						method: 'user.register',
						data: {
							code,
							avatar,
							nickname: this.nickname
						}
					})
					
					if (res.token) {
						uni.setStorageSync('token', res.token)
						this.isLogin = true
						uni.$emit('loginSuccess')
						this.$emit('success')
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
		padding: 30rpx;
		box-sizing: border-box;
		background-color: $ipieces-white-color;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.title {
		font-size: 28rpx;
		line-height: 32rpx;
		color: $ipieces-primary-color;
		font-weight: 600;
		align-self: flex-start;
	}
	
	button.avatar-wrap {
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
		border: none;
		background-color: $ipieces-grey-bg-color;
		display: block;
		position: relative;
		margin-top: 60rpx;
	}
	
	
	.avatar {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 160rpx;
		height: 160rpx;
	}
	
	.empty-icon {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	
	.nickname-wrap {
		margin-top: 30rpx;
	}
	
	.nickname-wrap input {
		width: 300rpx;
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