<template>
	<view class="wrap">
		<view v-for="(item, index) in list" class="one-wrap"
			:class="{'mg10': max > 1}"
			:style="{width: `${w}rpx`, height: `${h}rpx`}" 
			@click="onclick(index)" >
			<view v-if="item" class="content">
				<image :src="`${item.url}`"></image>
			</view>
		</view>
		<view v-if="list.length !== max" class="one-wrap"
			:style="{width: `${w}rpx`, height: `${h}rpx`}" 
			@click="onclick()">
			<view class="empty">
				<uni-icons type="plusempty"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ImageInput",
		props: [
			'width',
			'height',
			'defaultValue', // 数组，[{id: 'xxx', url: 'xxxx'}]
			'disabled',
			'count'
		],
		data() {
			return {
				list: this.defaultValue || [],
				w: this.width || 200,
				h: this.height || 200,
			};
		},
		computed: {
			max () {
				return parseInt(this.count) || 1
			}
		},
		methods: {
			onclick (index) {
				if (this.disabled) {
					this.showLargeImage(index)
				} else {
					if (index !== undefined) {
						this.openSheet(index)
					} else {
						this.upload()
					}
				}
			},
			showLargeImage (index) {
				uni.previewImage({
					current: index,
					urls: this.list.map(item => item.url)
				})
			},
			openSheet (index) {
				uni.showActionSheet({
					itemList: ['查看大图', '替换图片', '删除'],
					success: (res) => {
						let tapIndex = res.tapIndex
						if (tapIndex === 0) {
							this.showLargeImage(index)
						}
						
						if (tapIndex === 1) {
							this.upload(index)
						}
						
						if (tapIndex === 2) {
							this.remove(index)
						}
					}
				})
			},
			upload (index) {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						let {path, size} = res.tempFiles[0]
						const maxSize = 1024 * 1024 * 2 // 2m
						
						if (size > maxSize) {
							uni.showToast({
								icon: 'none',
								title: '图片大小请限制在2M以内'
							})
						} else {
							let list = this.list.concat()
							list[index || 0] = {
								url: path,
								id: ''
							}
							this.list = list
							this.$emit('change', this.list)
							
							
							// console.log(upload)
						}
						
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			remove (index) {
				this.list.splice(index, 1)
				this.$emit('change', this.list)
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		display: flex;
		flex-direction: row;
	}
	
	.one-wrap {
		position: relative;
		border-radius: 8rpx;
		overflow: hidden;
	}
	
	.mg10 {
		margin-right: 10rpx;
	}
	
	.content {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.content image {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.empty {
		width: 100%;
		height: 100%;
		background-color: $ipieces-border-color;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>