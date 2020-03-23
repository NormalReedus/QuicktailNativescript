<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="ice of ices" :key="ice" @tap="updateIceData(ice)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ ice }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
	export default {
		name: 'FormIce',

		computed: {
			ices() {
				return this.$store.state.ices
			}
		},

		methods: {
			updateIceData(data) {
				this.$store.commit('update', { prop: 'iceData', data })
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>