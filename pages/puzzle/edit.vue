<template>
	<view v-if="isInit" class="page-wrap">
		<uni-section type="line"
			title="图样/封面"
			sub-title="请上传拼图封面">
			<UploadImage dataid="cover" :defaultValue="[]"></UploadImage>
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
	
	import UploadImage from '../../components/UploadImage.vue'
	import requestCloud from '../../utils/requestCloud.js'
	
	export default {
		props: ['id'],
		components: {UploadImage},
		data() {
			return {
				_id: null,
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
					cover_info: null
				},
				tempFile: null,
				coverImage: null,
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
						data: {id: this.id}
					})
					this.item = Object.assign(this.item, res.data)
					this.coverImage = [{
						url: this.item.cover_url,
						id: this.item.cover
					}]
				} else {
					this.coverImage = []
				}
				this.isInit = true
			},
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
