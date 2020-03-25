<template>
		<TextView editable="true" />
</template>

<script>
	export default {
		name: 'FormMisc',


		computed: {
			// miscDesc: {
			// 	get() {
			// 		return this.$store.state.miscData.desc
			// 	},

			// 	set(data) {
			// 		this.$store.commit('update', { prop: 'garnishData', data })
			// 	}
			// }
		},

		methods: {
			getNested(pathArr) {
				if (pathArr.length === 0) {
					throw "Object or properties does not exist"
				}

				return pathArr.reduce((acc, cur) => acc[cur], this.$store.state)
			},

			setNested(pathArr, val) {
				if (pathArr.length === 0) {
					throw "Object or properties does not exist"
				} else if (pathArr.length === 1) {
					throw "setNested should not be used with a path of length 1"
				}

				const ref = pathArr.slice(0, -1)
				const prop = pathArr[pathArr.length - 1]

				ref.reduce((acc, cur) => acc[cur], this.$store.state)[prop] = val
			}
		},

		created() {
			console.log(this.getNested(['miscData', 'desc']))
			this.setNested(['miscData', 'desc'], 'randomtest')
			console.log(this.getNested(['miscData', 'desc']))
		}
	}
</script>

<style lang="scss" scoped>

</style>