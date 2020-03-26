<template>
  <Page>
    <ActionBar title="Create Cocktail">
      <StackLayout orientation="horizontal" ios:horizontalAlignment="center" android:horizontalAlignment="center">
        <Label text="Create Cocktail" class="h2" />
      </StackLayout>
    </ActionBar>

    <GridLayout rows="*, auto" columns="*">
      <Tabs v-model="selectedTabIndex" row="0">
        <TabStrip :class="{ filled: selectedTabDataRef }">
          <TabStripItem :class="{ filled: glassData }">
            <Label>Glass</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: iceData }">
            <Label>Ice</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: methodData }">
            <Label>Method</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: ingredientsData.length !== 0 }">
            <Label>Ingredients</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: garnishData }">
            <Label>Garnish</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: miscData.description || miscData.imgSrc || miscData.name }">
            <Label>Misc.</Label>
          </TabStripItem>
        </TabStrip> 

        <TabContentItem>
          <FormGlass @nextTab="nextTab" />
        </TabContentItem>

        <TabContentItem>
          <FormIce @nextTab="nextTab" />
        </TabContentItem>

        <TabContentItem>
          <FormMethod @nextTab="nextTab" />
        </TabContentItem>

        <TabContentItem>
          <FormIngredients />
        </TabContentItem>

        <TabContentItem>
          <FormGarnish />
        </TabContentItem>

        <TabContentItem>
          <FormMisc />
        </TabContentItem>
      </Tabs>

      <StackLayout row="1">
        <Button text="Save" class="-primary" @tap="saveCocktail" />
        <Button text="Discard" class @tap="discardCocktail" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import FormGlass from '@/components/FormGlass'
import FormIce from '@/components/FormIce'
import FormMethod from '@/components/FormMethod'
import FormIngredients from '@/components/FormIngredients'
import FormGarnish from '@/components/FormGarnish'
import FormMisc from '@/components/FormMisc'

const dialogs = require('tns-core-modules/ui/dialogs')

export default {
	name: 'Create',

	components: {
		FormGlass,
		FormIce,
		FormMethod,
		FormIngredients,
		FormGarnish,
		FormMisc,
	},

	data() {
		return {
			selectedTabIndex: 0, // "Glass" is first tab shown
		}
	},

	computed: {
		glassData() {
			return this.$store.state.glassData
		},

		iceData() {
			return this.$store.state.iceData
		},

		methodData() {
			return this.$store.state.methodData
		},

		ingredientsData() {
			return this.$store.state.ingredientsData
		},

		garnishData() {
			return this.$store.state.garnishData
		},

		miscData() {
			return this.$store.state.miscData
		},

		selectedTabDataRef() {
			// Maps tab index to the corresponding data in vuex
			// and checks if the tab is "filled" like with the individual tab labels:
			switch (this.selectedTabIndex) {
				case 0:
					return this.glassData
					break

				case 1:
					return this.iceData
					break

				case 2:
					return this.methodData
					break

				case 3:
					return this.ingredientsData.length !== 0
					break

				case 4:
					return this.garnishData
					break

				case 5:
					return this.miscData.description || this.miscData.imgSrc
					break

				default:
					return false
			}
		},
	},

	methods: {
		update(prop, val) {
			this.$store.commit('update', { prop, val })
			// this.nextTab()
		},

		saveCocktail() {
			this.$store.commit('saveCocktail')
			this.$store.commit('discardCocktail') // Clears earlier data

			this.$navigateBack()
		},

		async discardCocktail() {
			const discard = await dialogs.confirm({
				title: 'Discard Coctail?',
				okButtonText: 'Discard',
				cancelButtonText: 'Cancel',
			})

			if (discard) {
				this.$store.commit('discardCocktail')

				this.$navigateBack()
			}
		},

		nextTab() {
			if (this.selectedTabIndex < 5) {
				// less than number of tabs
				this.selectedTabIndex++
			}
		},
	},
}
</script>

<style scoped lang="scss">
.filled {
	color: lightgreen;
	highlight-color: lightgreen;
}
</style>