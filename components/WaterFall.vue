<template>
	<view class="list">
		<view class="left" >
			<view>
				<PartyCard v-for="item in leftItems" :data="item"></PartyCard>
			</view>
		</view>
		<view class="right" >
			<view>
				<PartyCard v-for="item in rightItems" :data="item"></PartyCard>
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
					if (!this.leftHeight && !this.rightHeight) {
						this.leftItems.push(item)
						this.leftHeight += item.itemHeight
					} else if (this.leftHeight < this.rightHeight) {
						this.leftItems.push(item)
						this.leftHeight += item.itemHeight
					} else {
						this.rightItems.push(item)
						this.rightHeight += item.itemHeight
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
	}
	
	// .left {
	// 	margin: 0 10rpx;
	// }
	
	// .right {
	// 	margin: 0 10rpx;
	// }
</style>
