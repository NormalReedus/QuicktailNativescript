<template>
  <ScrollView verticalAlign="middle">
    <FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button
        v-for="method of methods"
        :key="method"
        @tap="updateMethod(method)"
        :class="{ selected: method === selectedMethod }"
        class="h2 -primary -rounded-sm"
        flexGrow="1"
        height="60"
        width="120"
      >{{ method }}</Button>
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

		selectedMethod: {
			get() {
				return this.$store.state.method
			},

			set(data) {
				this.$store.commit('update', { prop: 'method', data })
			},
		},
	},

	methods: {
		updateMethod(data) {
			// We can assign directly to state, since our setter in computed uses commit:
			if (data === this.selectedMethod) {
				this.selectedMethod = null
			} else {
				this.selectedMethod = data
			}

			this.$emit('nextTab')
		},
	},
}
</script>

<style lang="scss" scoped>
</style>