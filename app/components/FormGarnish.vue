<template>
  <TextView editable="true" v-model="garnish" hint="Description" class="-border -rounded" />
</template>

<script>
export default {
	name: 'FormGarnish',

	computed: {
		garnish: {
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