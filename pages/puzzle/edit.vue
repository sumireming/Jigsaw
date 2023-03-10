<template>
	<view class="page-wrap">
		<uni-section type="line"
			title="拼图图名"
			sub-title="请填写通俗常见的叫法">
			<uni-easyinput v-model="item.name" 
				:inputBorder="false" />
		</uni-section>
		<view class="action">
			<button type="primary" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	
	import requestCloud from '../../utils/requestCloud.js'
	
	export default {
		props: ['id'],
		data() {
			return {
				'_id': null,
				item: {
					
				}
			}
		},
		onLoad(option) {
			this._id = option.id
			if (this.id) {
				this._id = this.id
			} 
			if (this._id) {
				uni.setNavigationBarTitle({
					title: '编辑拼图信息'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '添加拼图条目'
				})
			}
		},
		async mounted() {
			if (this._id) {
				let res = await requestCloud({
					method: 'puzzle.getPuzzleInfo',
					data: {id: this.id}
				})
				this.item = res
			}
		},
		methods: {
			async save () {
				try {
					if (this._id) {
						let res = await requestCloud({
							method: 'puzzleManager.updatePuzzle',
							data: {
								_id: this.id,
								name: this.item.name
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
				
			}
		}
	}
</script>

<style>

</style>
