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
        <TabStrip>
          <TabStripItem :class="{ filled: glassData }">
            <Label>Glass</Label>
            <!-- <Image src="res://home"></Image> -->
          </TabStripItem>

          <TabStripItem :class="{ filled: iceData }">
            <Label>Ice</Label>
            <!-- <Image src="res://settings"></Image> -->
          </TabStripItem>

          <TabStripItem :class="{ filled: methodData }">
            <Label>Method</Label>
            <!-- <Image src="res://search"></Image> -->
          </TabStripItem>

          <TabStripItem :class="{ filled: ingredientsData }">
            <Label>Ingredients</Label>
            <!-- <Image src="res://search"></Image> -->
          </TabStripItem>

          <TabStripItem :class="{ filled: garnishData }">
            <Label>Garnish</Label>
            <!-- <Image src="res://search"></Image> -->
          </TabStripItem>

          <TabStripItem :class="{ filled: miscData }">
            <Label>Misc.</Label>
            <!-- <Image src="res://search"></Image> -->
          </TabStripItem>
        </TabStrip>

        <TabContentItem>
          <FormGlass @input="update('glassData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormIce :ices="ices" @input="update('iceData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormMethod :methods="methods" @input="update('methodData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormIngredients @input="update('ingredientsData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <Label class="h2 text-center">Garnish</Label>
          <!-- <FormGarnish :garnishes="garnishes" @input="update('garnishData', $event)" /> -->
        </TabContentItem>

        <TabContentItem>
          <Label class="h2 text-center">Misc.</Label>
          <!-- <FormMisc @input="update('miscData', $event)" /> -->
        </TabContentItem>
      </Tabs>

      <StackLayout row="1">
        <Button text="Save" class="-primary" @tap="saveCocktail" />
        <Button text="Discard" class="-outline" @tap="discardCocktail" />
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

const dialogs = require("tns-core-modules/ui/dialogs");

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
		}
	},

	methods: {
		update(prop, val) {
			this.$store.commit('update', { prop, val })
			// this.nextTab()
		},

		saveCocktail() {
			this.$store.commit('saveCocktail')
		},

		async discardCocktail() {
			const discard = await dialogs.confirm({
				title: "Discard Coctail?",
				okButtonText: "Discard",
				cancelButtonText: "Cancel"
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
}
</style>