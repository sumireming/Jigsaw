const trimArray = (arr) => {
	return arr.filter(item => {return Boolean(item) === true})
}

export { trimArray }