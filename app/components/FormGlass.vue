<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="glass of glassTypes" :key="glass" @tap="setGlass(glass)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ glass }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
export default {
	name: 'FormGlass',
	props: {
		glassTypes: Array, // Of strings
	},

	components: {},

	data() {
		return {
			glasses: [], // Loads from appSettings
		}
	},

	methods: {
		setGlass(glassName) {
			this.$emit('input', glassName)
		}
	}

}
</script>

<style lang="scss" scoped>
</style>