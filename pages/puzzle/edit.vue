<template>
	<view v-if="isInit" class="page-wrap">
		<uni-section type="line"
			title="封面"
			sub-title="请上传拼图封面">
			<ImageInput dataid="cover" :defaultValue="coverImage" @change="coverChange"></ImageInput>
		</uni-section>
		<uni-section type="line"
			title="拼图图名"
			sub-title="请填写通俗常见的叫法">
			<uni-easyinput v-model="item.name" 
				:inputBorder="false" />
		</uni-section>
		<uni-section type="line"
			title="别名"
			:sub-title="`除上面已填写的图名外的其他别名，如“圣诞冬灯”又名“Winter Lights”，别名可以添加多个`">
			<view v-for="(name, index) in item.other_name" class="array-item">
				<uni-easyinput  
					v-model="item.other_name[index]" 
					:inputBorder="false"></uni-easyinput>
				<uni-icons class="del-icon" 
					type="trash-filled" 
					size="20" 
					color="rgba(0, 0, 0, .3)"
					@click="removeOtherName(index)"></uni-icons>
			</view>
			<view class="array-item-action">
				<view class="add" @click="addOtherName">+添加别名</view>
			</view>
		</uni-section>
		<uni-section type="line"
			title="拼图品牌"
			sub-title="请选择品牌">
			<uni-easyinput v-model="item.brand_name" 
				:inputBorder="false" />
		</uni-section>
		<uni-section type="line"
			title="画家/艺术家"
			sub-title="请填写这幅拼图的原画作者">
			<uni-easyinput v-model="item.artist_name" 
				:inputBorder="false" />
		</uni-section>
		<uni-section type="line"
			title="拼图片数"
		>
			<uni-easyinput v-model="item.pieces" 
				:inputBorder="false" />
		</uni-section>
		<view class="action">
			<button type="primary" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	
	import ImageInput from '../../components/ImageInput.vue'
	import requestCloud from '../../utils/requestCloud.js'
	import { uploadImage, getObjectDiff } from '../../utils/utils.js'
	
	export default {
		props: ['id'],
		components: {ImageInput},
		data() {
			return {
				_id: null,
				originItem: {},
				item: {
					name: '',
					other_name: [],
					brand_id: '',
					brand_name: '',
					artist_id: '',
					artist_name: '',
					pieces: 0,
					cover: '',
					cover_url: '',
					cover_info: {}
				},
				tempFile: null,
				coverImage: [],
				isInit: false
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
			this.init()
		},
		methods: {
			async init () {
				if (this._id) {
					let res = await requestCloud({
						method: 'puzzle.getPuzzleInfo',
						data: {id: this._id}
					})
					if (res.data) {
						this.item = Object.assign(this.item, res.data)
						this.originItem = JSON.parse(JSON.stringify(this.item))
						if (this.item.cover_url) {
							this.coverImage = [{
								url: this.item.cover_url,
								id: this.item.cover
							}]
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '该条目不存在',
							success: () => {
								uni.navigateBack()
							}
						})
					}
					
				} else {
					this.coverImage = []
				}
				this.isInit = true
			},
			coverChange (value) {
				this.coverImage = value
			},
			async handleCover () {
				if (this.coverImage[0]) {
					if (!this.coverImage[0].id && this.coverImage[0].url) {
						let res = await uploadImage(this.coverImage[0].url, 'puzzle/')
						if (res) {
							this.item.cover = res.fileID
							this.item.cover_info = res.info
						}
					}
				} else {
					this.item.cover = ''
					this.item.cover_info = ''
				}
			},
			async save () {
				try {
					if (!this.item.name) {
						uni.showToast({
							icon:'none',
							title: '请填写拼图图名'
						})
						return
					}
					
					if (!this.coverImage[0]) {
						uni.showToast({
							icon: 'none',
							title: '请上传拼图封面'
						})
						return
					}
					
					let res
					await this.handleCover()
					
					
					if (this._id) {
						// 更新拼图信息
						let diff = getObjectDiff(this.item, this.originItem)
						console.log(diff)
						if (diff) {
							res = await requestCloud({
								method: 'puzzleManager.updatePuzzle',
								data: {
									_id: this.id,
									info: diff
								}
							})
							
						} else {
							uni.showToast({
								icon:'none',
								title: '当前内容没有修改，不能保存'
							})
						}
					} else {
						// 添加品牌信息
						res = await requestCloud({
							method: 'puzzleManager.addPuzzle',
							data: {
								info: this.item
							}
						})
						
						if (res) {
							this._id = res.id
						}
						
					}
					
					if (res) {
						uni.showToast({
							icon: 'success',
							title: '保存成功',
							success: () => {
								uni.redirectTo({
									url: `/pages/puzzle/detail?id=${this._id}`
								})
							}
						})
					} else {
						uni.showToast({
							icon:'none',
							title: '保存出现问题，请稍后再试'
						})
					}
				} catch (e) {
					console.log(e)
				}
				
			},
			removeOtherName (index) {
				this.item.other_name.splice(index, 1)
			},
			addOtherName () {
				console.log(this.item)
				this.item.other_name.push('')
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.array-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 12rpx;
	}
	
	.array-item .del-icon {
		margin-left: 20rpx;
	}
	
	.array-item-action {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	
	.array-item-action .add {
		color: $ipieces-text-grey;
		font-size: 24rpx;
		padding: 4rpx 8rpx;
		border: 2rpx solid $ipieces-text-grey;
		border-radius: 8rpx;
	}
</style>
