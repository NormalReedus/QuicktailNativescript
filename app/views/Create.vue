<template>
  <Page>
    <ActionBar title="Create Cocktail">
      <StackLayout
        orientation="horizontal"
        ios:horizontalAlignment="center"
        android:horizontalAlignment="center"
      >
        <Label text="Create Cocktail" class="h2" />
      </StackLayout>
    </ActionBar>

    <GridLayout rows="*, auto" columns="*">
      <Tabs v-model="selectedTabIndex" row="0">
        <TabStrip :class="{ filled: selectedTabDataRef }">
          <TabStripItem :class="{ filled: glass }">
            <Label>Glass</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: ice }">
            <Label>Ice</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: method }">
            <Label>Method</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: ingredients.length !== 0 }">
            <Label>Ingredients</Label>
          </TabStripItem>

          <TabStripItem :class="{ filled: garnish }">
            <Label>Garnish</Label>
          </TabStripItem>

          <TabStripItem
            :class="{ filled: name }"
          >
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
        <Button text="Discard" @tap="discardCocktail" />
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
const fs = require('tns-core-modules/file-system')

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
		glass() {
			return this.$store.state.glass
		},

		ice() {
			return this.$store.state.ice
		},

		method() {
			return this.$store.state.method
		},

		ingredients() {
			return this.$store.state.ingredients
		},

		garnish() {
			return this.$store.state.garnish
		},

		description() {
			return this.$store.state.description
		},

		imgSrc() {
			return this.$store.state.imgSrc
		},

		name() {
			return this.$store.state.name
		},

		selectedTabDataRef() {
			// Maps tab index to the corresponding data in vuex
			// and checks if the tab is "filled" like with the individual tab labels:
			switch (this.selectedTabIndex) {
				case 0:
					return this.glass
					break

				case 1:
					return this.ice
					break

				case 2:
					return this.method
					break

				case 3:
					return this.ingredients.length !== 0
					break

				case 4:
					return this.garnish
					break

				case 5:
					return this.description || this.imgSrc
					break

				default:
					return false
			}
		},

		dataIsSet() {
			//! Tilføj default img her, hvis intet er sat
			return (
				this.glass &&
				this.ice &&
				this.method &&
				this.ingredients.length > 0 &&
				this.name
			)
		},
	},

	methods: {
		update(prop, val) {
			this.$store.commit('update', { prop, val })
		},

		async saveCocktail() {
			if (!this.dataIsSet) {
				return dialogs.alert(
					'One or more necessary fields have not been filled.'
				)
			}

			try {
				// We await to make sure we catch any errors before navigating back:
				await this.$store.dispatch('saveCocktail')
				this.$navigateBack()
			} catch (err) {
				console.log(err)
			}
		},

		async discardCocktail() {
			const discard = await dialogs.confirm({
				title: 'Discard Coctail?',
				okButtonText: 'Discard',
				cancelButtonText: 'Cancel',
			})

			if (!discard) return

			this.$store.commit('discardCocktail')
			this.$navigateBack()
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