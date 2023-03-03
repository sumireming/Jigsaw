<template>
	<view  class="page-wrap">
		<uni-section type="line"
			title="品牌名"
			sub-title="请尽量填写最通俗最常见的品牌叫法">
			<uni-easyinput v-model="item.name" 
				:inputBorder="false" />
		</uni-section>
		<uni-section type="line"
			title="别名"
			:sub-title="`除上面已填写的品牌名外的其他别名，如“Ravensburger”又名“睿思”，别名可以添加多个`">
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
		<uni-section type="line" title="LOGO">
			<uni-file-picker
				ref="imagefile"
				:value="logo_image" 
				fileMediatype="image" 
				mode="grid" 
				:limit="1"
				:auto-upload="false"
				@select="imageSelect" 
				@delete="imageDelete"
			></uni-file-picker>
		</uni-section>
		<uni-section type="line" title="国家/区域">
			<uni-easyinput v-model="item.region_name"
				@change="onRegionChange"
				:inputBorder="false"></uni-easyinput>
			<view class="tag-wrap">
				<view class="tag" 
					v-for="region in regionList"
					:class="{'selected': region.name === item.region_name}"
					@click="() => {
						item.region_id = region._id
						item.region_name = region.name
					}">{{region.name}}</view>
			</view>
		</uni-section>
		<uni-section type="line" title="成立年">
			<uni-easyinput v-model="item.founded_year"
				:inputBorder="false"></uni-easyinput>
		</uni-section>
		<uni-section type="line" 
			title="系列"
			:sub-title="`通常一些拼图品牌旗下会有很多系列，如Jumbo的“WASGJI悬疑系列”，系列可以添加多个`">
			<view v-for="(name, index) in item.series" class="array-item">
				<uni-easyinput  
					v-model="item.series[index]" 
					:inputBorder="false"></uni-easyinput>
				<uni-icons class="del-icon" 
					type="trash-filled" 
					size="20" 
					color="rgba(0, 0, 0, .3)"
					@click="removeSeries(index)"></uni-icons>
			</view>
			<view class="array-item-action">
				<view class="add" @click="addSeries">+添加系列</view>
			</view>
		</uni-section>
		<uni-section type="line" 
			title="简介"
			sub-title="请尽量客观描述品牌特点/特色">
			<uni-easyinput v-model="item.breif"
				type="textarea" 
				autoHeight
				:inputBorder="false"
				:maxlength="2000" ></uni-easyinput>
		</uni-section>
		<view class="action">
			<button type="primary" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	import { trimArray, handleDBResult } from '../../utils/utils.js'
	const db = uniCloud.database()
	
	export default {
		props: ['id'],
		data() {
			return {
				'_id': null,
				'logo_image': null,
				item: {
					'name': '',
					'other_name': [],
					'logo': '',
					'region_id': '',
					'region_name': '',
					'founded_year': '',
					'series': [],
					'breif': ''
				},
				tempFile: null,
				regionList: null
				
			}
		},
		onLoad(option) {
			this._id = option.id
			if (this.id) {
				this._id = this.id
			} 
			if (this._id) {
				uni.setNavigationBarTitle({
					title: '编辑品牌'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '添加品牌'
				})
			}
		},
		async mounted() {
			if (this._id) {
				this.getInfo()
			}
			this.getRegion()
		},
		methods: {
			async getRegion () {
				const puzzle = uniCloud.importObject('puzzle')
				try {
					let res = await puzzle.getRegionList()
					this.regionList = res.data
				} catch (e) {
					uni.showModal({
						title: '报错',
						content: JSON.stringify(e)
					})
				}
			},
			async getInfo () {
				try {
					let res = await db.collection('brand').doc(this._id).get()
					this.item = handleDBResult(res)[0]
					if (this.item.logo) {
						await this.getLogoImage()
					}
				} catch (e) {
					uni.showModal({
						title: '报错',
						content: JSON.stringify(e)
					})
				}
			},
			async getLogoImage () {
				let obj = await uniCloud.getTempFileURL({
					fileList: [this.item.logo]
				})
				
				this.logo_image = obj.fileList.map(item => {
					return {
						'name': item.fileid,
						'extname': 'mime_type',
						'url': item.tempFileURL
					}
				})
				
			},
			async save () {
				uni.showLoading()
				try {
					
					// 品牌名必填
					if (!this.item.name) {
						uni.showToast({
							title: '请填写品牌名'
						})
						return
					}
					
					// 上传图片
					if (this.tempFile) {
						let upload = await uniCloud.uploadFile({
							filePath: this.tempFile.path,
							cloudPath: `brand/${this.item.name}.${this.tempFile.extname}`
						})
						
						if (this.item.logo) {
							this.removeCloudFile(this.item.logo)
						}
						
						this.item.logo = upload.fileID
					}
					
					// 处理数组
					this.item.other_name = trimArray(this.item.other_name)
					this.item.series = trimArray(this.item.series)
					
					// 处理Region
					if (this.item.region_name && !this.item.region_id) {
						let res_region = await db.collection('region').add({
							name: this.item.region_name
						})
						this.item.region_id = handleDBResult(res_region)._id
					}
					
					if (!this._id) {
						let res = await db.collection('brand').add(this.item)
						this._id = handleDBResult(res).id
						
						uni.showModal({
							title: '新建成功',
							content: JSON.stringify(res),
							success() {
								uni.navigateBack()
							}
						})
					} else {
						delete this.item._id
						let res = await db.collection('brand').doc(this._id).update(this.item)
						
						uni.showModal({
							title: '修改成功',
							content: JSON.stringify(res),
							success() {
								uni.navigateBack()
							}
						})
					}
					uni.hideLoading()
					
				} catch (e) {
					uni.hideLoading()
					uni.showModal({
						title: '报错',
						content: e.message
					})
				}
			},
			removeCloudFile (fileid) {
				uniCloud.deleteFile({
					fileList: [fileid]
				})
			},
			onRegionChange (val) {
				if (val) {
					let region = this.regionList.find(ritem => {
						return val === ritem.name
					})
					if (region) {
						this.item.region_id = region._id
					}
				} else {
					this.item.region_id = ''
				}
			},
			imageSelect (e) {
				this.tempFile = e.tempFiles[0]
			},
			imageDelete () {
				if (this.tempFile) {
					this.tempFile = null
				} 
				
				if (this.item.logo) {
					this.item.logo = ''
				}
			},
			removeOtherName (index) {
				this.item.other_name.splice(index, 1)
			},
			addOtherName () {
				this.item.other_name.push('')
			},
			removeSeries (index) {
				this.item.series.splice(index, 1)
			},
			addSeries () {
				this.item.series.push('')
			}
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
	
	.action {
		padding: 40rpx 0;
	}
	
	.tag-wrap {
		padding-top: 20rpx;
	}
</style>
