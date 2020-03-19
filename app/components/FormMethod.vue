<template>
		<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="method of methods" :key="method" @tap="set(method)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ method }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
	export default {
		name: 'FormMethod',

		props: {
			methods: Array // Of strings
		},

		methods: {	
			set(methodData) {
				this.$emit('input', methodData)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>