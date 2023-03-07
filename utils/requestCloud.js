/***
	options.method -- 云函数方法名，例：user.login
	options.data -- 参数
***/
export default function requestCloud(options) {
	return new Promise(async (resolve, reject) => {
		if (options.method) {
			try {
				let obj = uniCloud.importObject(options.method.split('.')[0])
				let method = options.method.split('.')[1]
				let data = options.data || {}
				let res = await obj[method](data, {
					token: uni.getStorageSync('token')
				})
				resolve(res)
			} catch (e) {
				reject()
			}
		} else {
			uni.showToast({
				icon: 'none',
				title: 'requestCloud失败: 未传入method'
			})
			reject()
		}
	})
}