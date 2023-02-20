<template>
	<view>
		<uni-section title="拼图品牌">
			<uni-easyinput v-model="item.name" placeholder="" />
		</uni-section>
		<uni-section title="logo">
			<uni-file-picker
				v-model="item.logo" 
				fileMediatype="image" 
				mode="grid" 
				@select="imageSelect" 
				@progress="imageProgress" 
				@success="imageSuccess" 
				@fail="imageFail" 
			></uni-file-picker>
		</uni-section>
		<button type="primary" @click="save">保存</button>
	</view>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				item: {
					'name': '',
					'logo': null
				}
			}
		},
		methods: {
			save () {
				const db = uniCloud.database()
				if (!this.id) {
					db.collection('brand').add(this.item).then(e => {
						console.log(e)
					})
				}
			},
			imageSelect (e) {
				console.log('imageSelect')
				console.log(e)
			},
			imageProgress (e) {
				console.log('imageProgress')
				console.log(e)
			},
			imageSuccess (e) {
				console.log('imageSuccess')
				console.log(e)
			},
			imageFail (e) {
				console.log('imageFail')
				console.log(e)
			}
		}
	}
</script>

<style>

</style>
