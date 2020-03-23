<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="method of methods" :key="method" @tap="updateMethodData(method)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ method }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
	export default {
		name: 'FormMethod',

		computed: {
			methods() {
				return this.$store.state.methods
			}
		},

		methods: {	
			updateMethodData(data) {
				this.$store.commit('update', { prop: 'methodData', data })
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>