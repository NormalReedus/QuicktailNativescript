<template>
	<TextView editable="true" v-model="garnishData" />
</template>

<script>
	export default {
		name: 'FormGarnish',

		computed: {
			garnishData: {
				get() {
					return this.$store.state.garnishData
				},

				set(data) {
					this.$store.commit('update', { prop: 'garnishData', data })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>