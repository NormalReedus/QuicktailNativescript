<template>
		<ScrollView>
			<StackLayout orientation="vertical">
				<FlexboxLayout v-for="ingredient of ingredients" :key="ingredient" alignItems="center" class="m-x-15">
					<Label>{{ ingredient }}</Label>
					<Button>x</Button>
				</FlexboxLayout>

				<FlexboxLayout alignItems="center">
					
					<TextField hint="Amount" keyboardType="number"></TextField>

					<!-- <ListPicker :items="units" v-model="selectedUnitIndex"/> -->

        	<TextField hint="Ingredient" class="nt-input m-x-15" flexGrow="1"></TextField>
    			
				</FlexboxLayout>
			</StackLayout>
		</ScrollView>
</template>

<script>
	const appSettings = require('tns-core-modules/application-settings')
	
	const units = JSON.parse(appSettings.getString('units'))
	const selectedUnitIndex = appSettings.getNumber('selectedUnitIndex')

	export default {
		name: 'FormIngredients',

		data() {
			return {
				ingredients: [
					'Hello',
					'Gday'
					
				],

				units,
				selectedUnitIndex

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>