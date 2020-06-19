<template>
  <TextView editable="true" v-model="selectedGarnish" hint="Description" class="-border -rounded" />
</template>

<script>
export default {
	name: 'FormGarnish',

	computed: {
		selectedGarnish: {
			get() {
				return this.$store.state.garnish
			},

			set(data) {
				this.$store.commit('update', {
					prop: 'garnish',
					data
				})
			},
		},
	},
}
</script>

<style lang="scss" scoped>
</style>