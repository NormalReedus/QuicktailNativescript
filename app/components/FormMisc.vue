<template>
  <GridLayout rows="auto auto" columns="*">
		<Button @tap="takePhoto" row="0">PHOTO</Button>
    <TextView editable="true" v-model="miscDataDescription" row="1" />
  </GridLayout>
</template>

<script>
export default {
	name: 'FormMisc',

	computed: {
		miscDataDescription: {
			get() {
				return this.$store.state.miscData.description
			},

			set(val) {
				this.$store.commit('setNested', {
					path: ['miscData', 'description'],
					val,
				})
			},
		},
	},

	methods: {
		takePhoto() {

		}
	},
}
</script>

<style lang="scss" scoped>
</style>