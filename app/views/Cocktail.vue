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
      <ScrollView ref="scrollView" @scroll="onScroll" row="1">
        <!-- <StackLayout> -->
        <GridLayout rows="30, auto, auto">
          <StackLayout ref="imgView" row="0" rowSpan="2">
            <Image :src="cocktail.imgSrc" />
          </StackLayout>

          <StackLayout width="100%" padding="10" row="2" class="background">
            <Label v-for="val of cocktailVals" :key="val" margin="30">{{ val }}</Label>
            <Button @tap="deleteCocktail" class="warn">Delete Cocktail</Button>
          </StackLayout>

          <FlexboxLayout justifyContent="flex-end" row="0" marginTop="60" height="30" marginRight="30">
            <Label
              width="34"
              height="34"
              class="btn-favourite"
              :class="cocktail.favourite ? 'fas' : 'far'"
              @tap="toggleFavourite"
            ></Label>
          </FlexboxLayout>
        </GridLayout>
        <!-- </StackLayout> -->
      </ScrollView>

      <!-- <FlexboxLayout justifyContent="flex-end" row="0" marginTop="30" marginRight="30">
				<Label width="30" height="30" class="favourite" :class="cocktail.favourite ? 'fas' : 'far'" @tap="toggleFavourite"></Label>
      </FlexboxLayout>-->
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
				title: 'Delete Cocktail?',
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
			console.log(this.cocktail.favourite)
		},
	},

	mounted() {
		console.log(this.cocktail)
	},
}
</script>

<style lang="scss" scoped>
@import '../variables';

.background {
	background: $primary1;
}

.btn-favourite {
	border-radius: 50%;

	color: $success;
	font-size: 30;
	font-weight: 700;
}
</style>