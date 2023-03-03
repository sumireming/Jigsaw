<template>
	<view class="page-wrap">
		<button @click="invoke">gogogo</button>
	</view>
</template>

<script>
	
	import { handleDBResult } from '../../utils/utils.js'
	
	const db = uniCloud.database()
	const puzzle = uniCloud.importObject('puzzle')
	
	export default {
		data() {
			return {
				list: []
			}
		},
		async mounted() {
			// this.getList()
			
		},
		methods: {
			async invoke () {
				
			},
			async getList () {
				let res = await puzzle.getPuzzleList()
				console.log(res)
				
			},
		}
	}
</script>

<style>

</style>
