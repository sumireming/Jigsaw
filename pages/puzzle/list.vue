<template>
	<view class="page-wrap">
		<PuzzleCard v-for="item in list" :data="item"></PuzzleCard>
	</view>
</template>

<script>
	
	import PuzzleCard from '../../components/PuzzleCard.vue'
	
	export default {
		components: {PuzzleCard},
		data() {
			return {
				list: []
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			async getList () {
				const puzzle = uniCloud.importObject('puzzle')
				let res = await puzzle.getPuzzleList()
				this.list = res
				
				// let list = res.data
				// console.log(list)
				// let files = await puzzle.getPuzzleTempImageUrl(list)
				// console.log(files)
			}
		}
	}
</script>

<style>

</style>
