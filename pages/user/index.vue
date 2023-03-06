<template>
	<view class="page-wrap">
		<button type="primary" @click="login">一键登录</button>
	</view>
</template>

<script>
	
	const user = uniCloud.importObject('user')
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login () {
				uni.login({
					complete: async (r) => {
						if (r.errMsg === 'login:ok') {
							let res = await user.login(r.code)
							console.log(res)
						} else {
							console.error(r)
						}
						
					}
				})
			}
		}
	}
</script>

<style>

</style>
