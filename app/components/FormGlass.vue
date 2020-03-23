<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="glass of glasses" :key="glass" @tap="updateGlassData(glass)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ glass }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
export default {
	name: 'FormGlass',

	computed: {
		glasses() {
			return this.$store.state.glasses
		}
	},

	methods: {
		updateGlassData(data) {
			this.$store.commit('update', { prop: 'glassData', data })
		},
	}

}
</script>

<style lang="scss" scoped>
</style>