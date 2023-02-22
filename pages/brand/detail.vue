<template>
	<view v-if="info" class="page-wrap">
		{{info}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id: '',
				info: null
			}
		},
		onLoad(param) {
			this._id = param.id
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
						console.log(this.info)
					}
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: JSON.stringify(e)
					})
				}
				
			},
			async getImageUrl () {
				if (this.info.logo) {
					let obj = await uniCloud.getTempFileURL({
						fileList: [this.info.logo]
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {
		
	}
</style>
