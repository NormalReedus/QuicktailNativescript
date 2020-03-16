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
                        <Label text="Glass"></Label>
                        <!-- <Image src="res://home"></Image> -->
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Ice"></Label>
                        <!-- <Image src="res://settings"></Image> -->
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Method"></Label>
                        <!-- <Image src="res://search"></Image> -->
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Ingredients"></Label>
                        <!-- <Image src="res://search"></Image> -->
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Garnish"></Label>
                        <!-- <Image src="res://search"></Image> -->
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Misc."></Label>
                        <!-- <Image src="res://search"></Image> -->
                    </TabStripItem>
                </TabStrip>



                <TabContentItem>
										<FormGlass />
                </TabContentItem>

                <TabContentItem>
										<FormIce />
                </TabContentItem>

								<TabContentItem>
										<FormMethod />
                </TabContentItem>

								<TabContentItem>
										<FormIngredients />
                </TabContentItem>

								<TabContentItem>
                    <Label text="Garnish" class="h2 text-center" />
										<!-- <FormGarnish /> -->
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
            return {};
        },

				methods: {
					
				}
    };
</script>

<style scoped lang="scss">

		
</style>