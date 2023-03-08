<template>
	<view class="page-wrap">
		<Login>
			<template>已登录</template>
			<template v-slot:register>
				<button type="primary">登录</button>
			</template>
		</Login>
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
	
	
</style>
