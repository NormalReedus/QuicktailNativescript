<template>
    <Page>
        <ActionBar title="Create Cocktail">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="center">
                <Label text="Create Cocktail" class="h2" />
            </StackLayout>
        </ActionBar>


        <DockLayout stretchLastChild="true">
					<DockLayout dock="bottom" justifyContent="space-between" stretchLastChild="true">
						<StackLayout dock="right">
							<Button text="Discard" class="-outline"/>
							<Button text="Save" class="-primary" @tap="saveCocktail"/>
						</StackLayout>

						<FlexboxLayout flexWrap="nowrap" justifyContent="space-around" dock="left">

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Glass</Label>
								<Image src="~/checkmark.png" v-if="glassData" stretch="stretch"/>
							</FlexboxLayout>

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Ice</Label>
								<Image src="~/checkmark.png" v-if="iceData" stretch="stretch"/>
							</FlexboxLayout>

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Method</Label>
								<Image src="~/checkmark.png" v-if="methodData" stretch="stretch"/>
							</FlexboxLayout>

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Ingredients</Label>
								<Image src="~/checkmark.png" v-if="ingredientsData" stretch="stretch"/>
							</FlexboxLayout>

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Garnish</Label>
								<Image src="~/checkmark.png" v-if="garnishData" stretch="stretch"/>
							</FlexboxLayout>

							<FlexboxLayout flexDirection="column" alignItems="center">
								<Label>Misc.</Label>
								<Image src="~/checkmark.png" v-if="miscData" stretch="stretch"/>
							</FlexboxLayout>

						</FlexboxLayout>
					</DockLayout>

					<Tabs dock="top" v-model="selectedTabIndex">
            <TabStrip>
              <TabStripItem>
                <Label>Glass</Label>
                <!-- <Image src="res://home"></Image> -->
              </TabStripItem>

              <TabStripItem>
                <Label>Ice</Label>
                <!-- <Image src="res://settings"></Image> -->
              </TabStripItem>

              <TabStripItem>
                <Label>Method</Label>
                <!-- <Image src="res://search"></Image> -->
              </TabStripItem>

              <TabStripItem>
                <Label>Ingredients</Label>
                <!-- <Image src="res://search"></Image> -->
              </TabStripItem>

              <TabStripItem>
                <Label>Garnish</Label>
                <!-- <Image src="res://search"></Image> -->
              </TabStripItem>

              <TabStripItem>
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
        </DockLayout>
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


    export default {
				name: "Create",
				
				components: {
					FormGlass,
					FormIce,
					FormMethod,
					FormIngredients,
					FormGarnish,
					FormMisc
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

							selectedTabIndex: 0 // "Glass" is first tab shown
						}
        },

				methods: {
					set(prop, value) {
						this[prop] = value
						// this.nextTab()
					},

					saveCocktail() {
						let cocktails = JSON.parse(appSettings.getString('cocktails'))

						cocktails.push(new Cocktail(this.glass, this.ice, this.method, this.ingredients, this.garnish, this.misc))

						appSettings.setString('cocktails', JSON.stringify(cocktails))
					},

					discardCocktail() {
						this.glass = null
						this.ice = null
						this.method = null
						this.ingredients = null
						this.garnish = null
						this.misc = null
					},

					nextTab() {
						if (this.selectedTabIndex < 5) { // less than number of tabs
							this.selectedTabIndex++
						}
					}
				},
    };
</script>

<style scoped lang="scss">
</style>