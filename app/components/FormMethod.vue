<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="method of methods" :key="method" @tap="updateMethodData(method)" :class="{ selected: methodData === method }" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ method }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
	export default {
		name: 'FormMethod',

		computed: {
			methods() {
				return this.$store.state.methods
			},

			methodData: {
				get() {
					return this.$store.state.methodData
				},

				set(data) {
					this.$store.commit('update', { prop: 'methodData', data })
				}
			}
		},

		methods: {	
			updateMethodData(data) {
				// We can assign directly to state, since our setter in computed uses commit:
				if (data === this.methodData) { 
					this.methodData = null
				} else {
					this.methodData = data
				}
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>