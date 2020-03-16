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

						<StackLayout dock="bottom">
								<Button text="Discard" class="-outline"/>
								<Button text="Save" class="-primary"/>
						</StackLayout>

            <Tabs dock="top">
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
										<FormGlass :glassTypes="glassTypes" />
                </TabContentItem>

                <TabContentItem>
										<FormIce :iceTypes="iceTypes" />
                </TabContentItem>

								<TabContentItem>
										<FormMethod :methods="methods" />
                </TabContentItem>

								<TabContentItem>
										<FormIngredients />
                </TabContentItem>

								<TabContentItem>
                    <Label class="h2 text-center">Garnish</Label>
										<!-- <FormGarnish :garnishes="garnishes" /> -->
                </TabContentItem>

								<TabContentItem>
                    <Label text="Misc" class="h2 text-center" />
										<!-- <FormMisc /> -->
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
							garnishes: JSON.parse(appSettings.getString('garnishes'))
						};
        },

				methods: {
					
				}
    };
</script>

<style scoped lang="scss">

		
</style>