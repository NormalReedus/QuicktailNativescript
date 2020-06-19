<template>
  <ScrollView verticalAlign="middle">
    <FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button
        v-for="ice of ices"
        :key="ice"
        @tap="updateIce(ice)"
        :class="{ selected: ice === selectedIce }"
        class="h2 -primary -rounded-sm"
        flexGrow="1"
        height="60"
        width="120"
      >{{ ice }}</Button>
    </FlexboxLayout>
  </ScrollView>
</template>

<script>
export default {
	name: 'FormIce',

	computed: {
		ices() {
			return this.$store.state.ices
		},

		selectedIce: {
			get() {
				return this.$store.state.ice
			},

			set(data) {
				this.$store.commit('update', {
					prop: 'ice',
					data
				})
			},
		},
	},

	methods: {
		updateIce(data) {
			// We can assign directly to state, since our setter in computed uses commit:
			if (data === this.selectedIce) {
				this.selectedIce = null
			} else {
				this.selectedIce = data
			}

			this.$emit('nextTab')
		},
	},
}
</script>

<style lang="scss" scoped>
</style>