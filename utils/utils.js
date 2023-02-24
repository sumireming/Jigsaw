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

export { trimArray, handleDBResult }