<template>
		<WrapLayout>
				<Label v-for="glass of glassTypes" :key="glass" class="h2 text-center">{{glass}}</Label>
		</WrapLayout>
</template>

<script>
	export default {
		name: 'FormGlass',
		props: {
			glassTypes: Array // Of strings
		},

		components: {

		},

		data() {
			return {
				glasses: [] // Loads from appSettings
			}
		},

		created() {
			console.log(this.glassTypes)
		}
	}
</script>

<style lang="scss" scoped>

</style>