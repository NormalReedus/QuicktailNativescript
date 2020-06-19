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
      <!-- <StackLayout> -->
			<GridLayout rows="auto, auto">
        <StackLayout ref="imgView" row="0">
          <Image :src="cocktail.imgSrc" />
        </StackLayout>

        <StackLayout width="100%" padding="10" row="1">
          <Label v-for="val of cocktailVals" :key="val" margin="30">{{ val }}</Label>
					<Button @tap="deleteCocktail" class="-primary -warn">Delete Cocktail</Button>
        </StackLayout>

				<Button row="0" @tap="toggleFavourite">{{ this.cocktail.favourite }}</Button>
			</GridLayout>
      <!-- </StackLayout> -->
    </ScrollView>
  </Page>
</template>

<script>
const dialogs = require('tns-core-modules/ui/dialogs')

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

			const offset = scrollView.verticalOffset / 1.65 // you can adjust this number to make the parallax more subtle or dramatic
			if (scrollView.ios) {
				// iOS adjust the position with an animation to create a smother scrolling effect.
				imgView.animate({ translate: { x: 0, y: offset } })

			} else {
				// Android, animations are jerky so instead just adjust the position without animation.
				imgView.translateY = Math.floor(offset)
			}
		},

		async deleteCocktail() {
			const remove = await dialogs.confirm({
				title: "Delete Cocktail?",
				okButtonText: 'Delete',
				cancelButtonText: 'Cancel',
			})

			if (!remove) return

			try {
				// We await to make sure we catch any errors before navigating back:
				await this.$store.dispatch('deleteCocktail', { id: this.cocktail.id })
				this.$navigateBack()
			} catch (err) {
				console.log(err)
			}	
		},

		toggleFavourite() {
			this.$store.commit('toggleFavourite', { id: this.cocktail.id })
		}
	},

	mounted() {
		console.log(this.cocktail)
	}
}
</script>

<style lang="scss" scoped>
</style>