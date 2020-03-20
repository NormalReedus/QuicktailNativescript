<template>
		<ScrollView>
			<StackLayout orientation="vertical">
				<FlexboxLayout v-for="ingredient of ingredientsData" :key="ingredient" alignItems="center" class="m-x-15">
					<Label>{{ ingredient }}</Label>
					<Button>x</Button>
				</FlexboxLayout>

				<FlexboxLayout alignItems="center">
					
					<TextField hint="Amount" keyboardType="number" v-model="amt"></TextField>

					<ListPicker :items="units" :selectedIndex="unitIndex" @selectedIndexChange="setUnitIndex($event.value)"/>

        	<TextField hint="Ingredient" class="nt-input m-x-15" flexGrow="1" v-model="ingredient"></TextField>
    			
				</FlexboxLayout>
			</StackLayout>
		</ScrollView>
</template>

<script>
	const appSettings = require('tns-core-modules/application-settings')
	
	const units = JSON.parse(appSettings.getString('units'))
	const defaultUnitIndex = appSettings.getNumber('defaultUnitIndex')

	export default {
		name: 'FormIngredients',

		data() {
			return {
				ingredientsData: [
					'Hello',
					'Gday'
					
				],

				units,
				unitIndex: defaultUnitIndex,

				amt: '',
				ingredient: ''
			}
		},

		methods: {
			setUnitIndex(val) {
				this.unitIndex = val
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>