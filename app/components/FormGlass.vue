<template>
  <ScrollView verticalAlign="middle">
    <FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button
        v-for="glass of glasses"
        :key="glass"
        @tap="updateGlassData(glass)"
        :class="{ selected: glassData === glass }"
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

		glassData: {
			get() {
				return this.$store.state.glassData
			},

			set(data) {
				this.$store.commit('update', { prop: 'glassData', data })
			},
		},
	},

	methods: {
		updateGlassData(data) {
			// We can assign directly to state, since our setter in computed uses commit:
			if (data === this.glassData) {
				this.glassData = null
			} else {
				this.glassData = data
			}

			this.$emit('nextTab')
		},
	},
}
</script>

<style lang="scss" scoped>
</style>