<template>
  <ScrollView verticalAlign="middle">
    <FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button
        v-for="ice of ices"
        :key="ice"
        @tap="updateIceData(ice)"
        :class="{ selected: iceData === ice }"
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

		iceData: {
			get() {
				return this.$store.state.iceData
			},

			set(data) {
				this.$store.commit('update', { prop: 'iceData', data })
			},
		},
	},

	methods: {
		updateIceData(data) {
			// We can assign directly to state, since our setter in computed uses commit:
			if (data === this.iceData) {
				this.iceData = null
			} else {
				this.iceData = data
			}

			this.$emit('nextTab')
		},
	},
}
</script>

<style lang="scss" scoped>
</style>