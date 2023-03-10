<template>
	<view>
	</view>
</template>

<script>
	import jsondata from './data.js'
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			// this.handleJSONToDB()
		},
		methods: {
			async handleJSONToDB () {
				
				jsondata.forEach(async (item, index) => {
					if (item.cover) {
						let u_res = await this.uploadImage(item)
						if (u_res.fileID) {
							item.cover = u_res.fileID
						}
						const db = uniCloud.database()
						let res = await db.collection('puzzle').add(item)
						console.log(res)
					}
				})
				
			},
			async uploadImage (item) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: item.cover,
						success: async (res) => {
							try {
								let filePath = res.tempFilePath
								let extName = filePath.match(/\..+$/)[0]
								
								// console.log(`${item.name}下载成功: ${filePath}`)
								
								if (filePath) {
									let res = await uniCloud.uploadFile({
										filePath,
										cloudPath: `puzzle/${item.name}${extName|| ''}`
									})
									resolve(res)
								}
							} catch (e) {
								reject(e)
							}
							
							
						},
						fail: (res) => {
							reject(res)
						}
					})
				})
			}
		}
	}
</script>

<style>

</style>
