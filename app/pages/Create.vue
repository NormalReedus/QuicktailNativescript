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
          <FormGlass :glasses="glasses" @input="set('glassData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormIce :ices="ices" @input="set('iceData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormMethod :methods="methods" @input="set('methodData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <FormIngredients @input="set('ingredientsData', $event)" />
        </TabContentItem>

        <TabContentItem>
          <Label class="h2 text-center">Garnish</Label>
          <!-- <FormGarnish :garnishes="garnishes" @input="set('garnishData', $event)" /> -->
        </TabContentItem>

        <TabContentItem>
          <Label class="h2 text-center">Misc.</Label>
          <!-- <FormMisc @input="set('miscData', $event)" /> -->
        </TabContentItem>
      </Tabs>

      <StackLayout row="1">
        <Button text="Save" class="-primary" @tap="saveCocktail" />
        <Button text="Discard" class="-outline" @tap="discardCocktail" />
      </StackLayout>

      <!-- <DockLayout stretchLastChild="true"> -->

      <!-- <FlexboxLayout flexWrap="nowrap" justifyContent="space-around" dock="left">
          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Glass</Label>
            <Image src="~/checkmark.png" v-if="glassData" stretch="stretch" />
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Ice</Label>
            <Image src="~/checkmark.png" v-if="iceData" stretch="stretch" />
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Method</Label>
            <Image src="~/checkmark.png" v-if="methodData" stretch="stretch" />
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Ingredients</Label>
            <Image src="~/checkmark.png" v-if="ingredientsData" stretch="stretch" />
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Garnish</Label>
            <Image src="~/checkmark.png" v-if="garnishData" stretch="stretch" />
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" alignItems="center">
            <Label>Misc.</Label>
            <Image src="~/checkmark.png" v-if="miscData" stretch="stretch" />
          </FlexboxLayout>
        </FlexboxLayout>
      </DockLayout>-->
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

import Cocktail from '@/components/Cocktail'
const appSettings = require('tns-core-modules/application-settings')
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
			glasses: JSON.parse(appSettings.getString('glasses')),
			ices: JSON.parse(appSettings.getString('ices')),
			methods: JSON.parse(appSettings.getString('methods')),
			garnishes: JSON.parse(appSettings.getString('garnishes')),

			glassData: null,
			iceData: null,
			methodData: null,
			ingredientsData: null,
			garnishData: null,
			miscData: null,

			selectedTabIndex: 0, // "Glass" is first tab shown
		}
	},

	methods: {
		set(prop, value) {
			this[prop] = value
			// this.nextTab()
		},

		saveCocktail() {
			let cocktails = JSON.parse(appSettings.getString('cocktails'))

			cocktails.push(
				new Cocktail(
					this.glassData,
					this.iceData,
					this.methodData,
					this.ingredientsData,
					this.garnishData,
					this.miscData
				)
			)

			appSettings.setString('cocktails', JSON.stringify(cocktails))
		},

		async discardCocktail() {
			const discard = await dialogs.confirm({
				title: "Discard Coctail?",
				okButtonText: "Discard",
				cancelButtonText: "Cancel"
			})

			if (discard) {
				this.glass = null
				this.ice = null
				this.method = null
				this.ingredients = null
				this.garnish = null
				this.misc = null

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