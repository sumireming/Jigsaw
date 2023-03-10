<template>
	<view class="page-wrap">
		<WaterFall v-if="list" :list="list"></WaterFall>
	</view>
</template>

<script>
	
	import WaterFall from '../../components/WaterFall.vue'
	import { handleDBResult } from '../../utils/utils.js'
	
	const db = uniCloud.database()
	const puzzle = uniCloud.importObject('puzzle')
	
	export default {
		components: { WaterFall },
		data() {
			return {
				list: null
			}
		},
		async mounted() {
			this.getList()
		},
		methods: {
			async invoke () {
				
			},
			async getList () {
				this.list = await puzzle.getPuzzleList()
				console.log(JSON.stringify(this.list))
			},
		}
	}
</script>

<style>

</style>
