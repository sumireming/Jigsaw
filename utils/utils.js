const uploadImage = async (path, prefix) => {
	let fileName = path.replace(/(.*\/)*([^.]+).*/ig,"$2")
	let fileType = path.replace(/.+\./, "")
	
	let {width, height} = await getImageInfo(path)
	let res = await uniCloud.uploadFile({
		filePath: path,
		cloudPath: `${prefix || 'public/'}${fileName}.${fileType}`
	})
	return {
		fileID: res.fileID, 
		info: {width, height},
	}
}

const getImageInfo = async (path) => {
	return new Promise(r => {
		uni.getImageInfo({
			src: path,
			success: (res) => {
				r(res)
			},
			fail: () => {
				r(res)
			}
		})
	})
}

const getObjectDiff = (newObject, oldObject) => {
	let result = {}
	for (let key in newObject) {
		let value = newObject[key]
		if (typeof value === 'object') {
			if (JSON.stringify(value) !== JSON.stringify(oldObject[key])) {
				result[key] = value
			}
		} else {
			if (value !== oldObject[key]) {
				result[key] = value
			}
		}
		
	}
	return Object.keys(result).length === 0 ? null : result
}

const trimArray = (arr) => {
	return arr.filter(item => {return Boolean(item) === true})
}

const handleDBResult = (res) => {
	if (res.errCode === 0) {
		let result = res.result
		if (result.errCode === 0) {
			return result.inserted === 1 ? result.id : result.data
		} else {
			uni.showModal({
				title: '结果层错误',
				content: JSON.stringify(res)
			})
		}
	} else {
		uni.showModal({
			title: '顶层错误',
			content: JSON.stringify(res)
		})
	}
}

export { uploadImage, getImageInfo, getObjectDiff, trimArray, handleDBResult }