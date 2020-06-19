<template>
  <ScrollView verticalAlign="middle">
    <FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button
        v-for="glass of glasses"
        :key="glass"
        @tap="updateGlass(glass)"
        :class="{ selected: glass === selectedGlass }"
        class="h2 -primary -rounded-sm"
        flexGrow="1"
        height="60"
        width="120"
      >{{ glass }}</Button>
    </FlexboxLayout>
  </ScrollView>
</template>

<script>
export default {
	name: 'FormGlass',

	computed: {
		glasses() {
			return this.$store.state.glasses
		},

		selectedGlass: {
			get() {
				return this.$store.state.glass
			},

			set(data) {
				this.$store.commit('update', {
					prop: 'glass',
					data
				})
			},
		},
	},

	methods: {
		updateGlass(data) {
			// We can assign directly to state, since our setter in computed uses commit:
			if (data === this.selectedGlass) {
				this.selectedGlass = null
			} else {
				this.selectedGlass = data
			}

			this.$emit('nextTab')
		},
	},
}
</script>

<style lang="scss" scoped>
</style>