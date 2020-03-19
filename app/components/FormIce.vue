<template>
	<ScrollView verticalAlign="middle">
  	<FlexboxLayout flexWrap="wrap" alignItems="center" justifyContent="center">
      <Button v-for="ice of ices" :key="ice" @tap="set(ice)" class="h2 -primary -rounded-sm" flexGrow="1" height="60" width="120">{{ ice }}</Button>
  	</FlexboxLayout>
	</ScrollView>
</template>

<script>
	export default {
		name: 'FormIce',

		props: {
			ices: Array // Of strings
		},

		methods: {
			set(iceData) {
				this.$emit('input', iceData)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>