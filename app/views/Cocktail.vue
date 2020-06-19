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

		<GridLayout rows="auto, *">
			<!-- margin -60 is to offset the favourite-button -->
    	<ScrollView ref="scrollView" @scroll="onScroll" row="1" marginTop="-60">
    	  <StackLayout>
				<!-- <GridLayout rows="auto, auto"> -->
    	    <StackLayout ref="imgView">
    	      <Image :src="cocktail.imgSrc" />
    	    </StackLayout>

    	    <StackLayout width="100%" padding="10" class="background">
    	      <Label v-for="val of cocktailVals" :key="val" margin="30">{{ val }}</Label>
						<Button @tap="deleteCocktail" class="-primary -warn">Delete Cocktail</Button>
    	    </StackLayout>

					<!-- <Label row="0" class="favourite" @tap="toggleFavourite">{{ this.cocktail.favourite }}</Label> -->
				<!-- </GridLayout> -->
    	  </StackLayout>
    	</ScrollView>

			<FlexboxLayout justifyContent="flex-end" row="0" marginTop="30" marginRight="30">
				<Label width="30" height="30" class="favourite" @tap="toggleFavourite">{{ this.cocktail.favourite }}</Label>
			</FlexboxLayout>

		</GridLayout>
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
@import '../variables';

.background {
	background: $primary1;
}

.favourite {
	background-color: red;
	border-radius: 50%;
}

.test {
	background: blue;
}
</style>