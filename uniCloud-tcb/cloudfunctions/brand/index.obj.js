// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	
	method1() {
		// 参数校验，如无参数则不需要
		// if (!param1) {
		// 	return {
		// 		errCode: 'PARAM_IS_NULL',
		// 		errMsg: '参数不能为空'
		// 	}
		// }
		// 业务逻辑
		console.log(123)
		// let info = this.getClientInfo()
		
		// 返回结果
		return {
			a: 1 //请根据实际需要返回值
		}
	}
}
