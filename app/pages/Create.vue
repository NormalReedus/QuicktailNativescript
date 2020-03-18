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
					<DockLayout id="test" dock="bottom" justifyContent="space-between" stretchLastChild="true" background="">
						<StackLayout dock="right">
								<Button text="Discard" class="-outline"/>
								<Button text="Save" class="-primary" @tap="saveCocktail"/>
						</StackLayout>

						<FlexboxLayout flexWrap="nowrap" justifyContent="space-around" dock="left">
							<Label>Glass</Label>
							<Image src="~/checkmark.png" v-if="glass"/>
							<Label>Ice</Label>
							<Label>Method</Label>
							<Label>Ingredients</Label>
							<Label>Garnish</Label>
							<Label>Misc.</Label>
						</FlexboxLayout>
					</DockLayout>

            <Tabs dock="top" v-model="selectedIndex">
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
										<FormGlass :glassTypes="glassTypes" @input="setGlass($event)" />
                </TabContentItem>

                <TabContentItem>
										<FormIce :iceTypes="iceTypes" @input="ice = $event" />
                </TabContentItem>

								<TabContentItem>
										<FormMethod :methods="methods" @input="method = $event" />
                </TabContentItem>

								<TabContentItem>
										<FormIngredients @input="ingredients = $event" />
                </TabContentItem>

								<TabContentItem>
                    <Label class="h2 text-center">Garnish</Label>
										<!-- <FormGarnish :garnishes="garnishes" @input="garnish = $event" /> -->
                </TabContentItem>

								<TabContentItem>
                    <Label text="Misc" class="h2 text-center" />
										<!-- <FormMisc @input="misc = $event" /> -->
                </TabContentItem>
            </Tabs>
        </DockLayout>


        <!-- <Label text="Add" /> -->
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
							glassTypes: JSON.parse(appSettings.getString('glassTypes')),
							iceTypes: JSON.parse(appSettings.getString('iceTypes')),
							methods: JSON.parse(appSettings.getString('methods')),
							garnishes: JSON.parse(appSettings.getString('garnishes')),

							glass: null,
							ice: null,
							method: null,
							ingredients: null,
							garnish: null,
							misc: null,

							selectedIndex: 0 // "Glass" is first tab shown
						}
        },

				methods: {
					setGlass(glassName) {
						this.glass = glassName
						this.nextTab()
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
						if (this.selectedIndex < 5) { // less than number of tabs
							this.selectedIndex++
						}
					}
				},
    };
</script>

<style scoped lang="scss">
</style>