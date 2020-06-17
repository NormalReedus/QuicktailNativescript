<template>
  <Page>
    <ActionBar :title="cocktail.name">
      <StackLayout
        orientation="horizontal"
        ios:horizontalAlignment="center"
        android:horizontalAlignment="center"
      >
        <Label class="h2">{{ cocktail.name }}</Label>
      </StackLayout>
    </ActionBar>

    <ScrollView ref="scrollView" @scroll="onScroll">
      <StackLayout>
        <StackLayout ref="imgView">
          <Image :src="cocktail.imgSrc" />
        </StackLayout>

        <StackLayout width="100%" padding="10">
          <Label v-for="val of cocktailVals" :key="val" margin="30">{{ val }}</Label>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
	name: 'Cocktail',

	props: {
		cocktail: Object,
	},

	computed: {
		cocktailVals() {
			return Object.values(this.cocktail)
		},
	},

	methods: {
		// Parallax effect:
		onScroll() {
			//access to the native event
			const scrollView = this.$refs.scrollView.nativeView
			const imgView = this.$refs.imgView.nativeView

			// if the offset is less than the height of the header.
			// if (scrollView.verticalOffset < 1024) {
			const offset = scrollView.verticalOffset / 1.65 // you can adjust this number to make the parallax more subtle or dramatic
			if (scrollView.ios) {
				// iOS adjust the position with an animation to create a smother scrolling effect.
				imgView.animate({ translate: { x: 0, y: offset } })
				// .then(
				// 	() => {},
				// 	() => {}
				// )
			} else {
				// Android, animations are jerky so instead just adjust the position without animation.
				imgView.translateY = Math.floor(offset)
			}
			// }
		},
	},

	mounted() {
		console.log(this.cocktail)
	}
}
</script>

<style lang="scss" scoped>
</style>