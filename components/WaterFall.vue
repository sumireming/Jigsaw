<template>
	<view class="list">
		<view class="left" >
			<view>
				<WaterFallItem v-for="item in leftItems" :info="item"></WaterFallItem>
			</view>
		</view>
		<view class="right" >
			<view>
				<WaterFallItem v-for="item in rightItems" :info="item"></WaterFallItem>
			</view>
		</view>
	</view>
</template>

<script>
	import WaterFallItem from './WaterFallItem.vue'
	
	export default {
		props: ['list'],
		components: { WaterFallItem },
		name:"WaterFall",
		data() {
			return {
				leftItems: [],
				rightItems: [],
				leftHeight: 0,
				rightHeight: 0
			};
		},
		watch: {
			list (val) {
				this.reset()
				this.calc()
			}
		},
		mounted() {
			if (this.list) {
				this.calc()
				console.log(this.leftItems)
			}
		},
		methods: {
			reset () {
				this.leftItems = []
				this.rightItems = []
				this.leftHeight = 0
				this.rightHeight = 0
			},
			calc () {
				for (let i = 0; i<this.list.length; i++) {
					let item = this.list[i]
					let width = item.cover_info.width
					let height = item.cover_info.height
					if (!this.leftHeight && !this.rightHeight) {
						this.leftItems.push(item)
						this.leftHeight += height
					} else if (this.leftHeight < this.rightHeight) {
						this.leftItems.push(item)
						this.leftHeight += height
					} else {
						this.rightItems.push(item)
						this.rightHeight += height
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
	}
	
	.left {
		margin: 0 10rpx;
	}
	
	.right {
		margin: 0 10rpx;
	}
</style>
