<template>
		<TextView editable="true" />
</template>

<script>
	export default {
		name: 'FormMisc',


		computed: {
			miscDataDesc() {
				return this.$store.state.getNested(['miscData', 'desc'])
			}
		},

		methods: {
			getNested(pathArr) {
				if (pathArr.length === 0) {
					throw "Object or properties does not exist"
				}

				return pathArr.reduce((acc, cur) => acc[cur], this.$store.state)
			},
		},

		created() {
			console.log(this.miscDataDesc)
			this.$store.commit('setNested', ['miscData', 'desc'], 'randomtest')
			console.log(this.miscDataDesc)
		}
	}
</script>

<style lang="scss" scoped>

</style>