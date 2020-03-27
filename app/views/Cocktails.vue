<template>
  <Page>
    <ActionBar title="Cocktails">
      <StackLayout
        orientation="horizontal"
        ios:horizontalAlignment="center"
        android:horizontalAlignment="center"
      >
        <Label class="h2">Cocktails</Label>
      </StackLayout>
    </ActionBar>

    <GridLayout>
      <ScrollView row="0">
        <FlexboxLayout flexWrap="wrap" padding="20" justifyContent="space-around" @tap="$navigateTo(Cocktail)">
					<StackLayout width="40%" v-for="cocktail of cocktails" :key="cocktail.imgSrc" class="-circle">
          	<Image :src="cocktail.imgSrc"  />
						<Label>{{ cocktail.name }}</Label>
					</StackLayout>
        </FlexboxLayout>
        <!-- <StackLayout>
          <Image v-for="cocktail of cocktails" :key="cocktail.imgSrc" :src="cocktail.imgSrc" />
        </StackLayout>-->
      </ScrollView>

      <AbsoluteLayout marginTop="87%" marginLeft="80%" row="0">
        <!-- <ActionButton /> -->
        <Image src="~/action_button.png" @tap="$navigateTo(Create)" height="56" width="56" />
      </AbsoluteLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Create from './Create'
import Cocktail from './Cocktail'
// import ActionButton from '@/components/ActionButton'

export default {
	name: 'Cocktails',

	data() {
		return {
			Create,
			Cocktail
		}
	},

	computed: {
		cocktails() {
			return this.$store.state.cocktails
		},
	},

	methods: {
		goToCocktailPage() {
			this.$navigateTo(Cocktail)/*, { //$showModal?
				// transition: {},
  			// transitioniOS: {},
  			// transitionAndroid: {},
				props: {
					cocktail: cocktailObj
				}
			})*/
		}
	},

	mounted() {
		// console.log(this.$store.state.cocktails.length)

		// this.$showModal(Cocktail)
	},
}
</script>

<style lang="scss" scoped>
</style>>
