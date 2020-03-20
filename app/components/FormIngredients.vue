<template>
		<ListPicker v-if="unitPickerShown" :items="units" :selectedIndex="unitIndex" @selectedIndexChange="setUnitIndex($event.value)" @tap="toggleUnitPicker"/>
		
		<ScrollView v-else>
			<StackLayout orientation="vertical">
				<FlexboxLayout v-for="ingredient of ingredientsData" :key="ingredient" alignItems="center" justifyContent="space-between" class="m-x-15">
					<Label>{{ ingredient }}</Label>
					<Button>x</Button>
				</FlexboxLayout>

				<FlexboxLayout alignItems="center">
					
					<TextField hint="Amount" keyboardType="number" v-model="amt"></TextField>
					<Button @tap="toggleUnitPicker">{{ selectedUnit }}</Button>
        	<TextField hint="Ingredient" class="nt-input m-x-15" flexGrow="1" v-model="ingredient" @returnPress="setIngredient"></TextField>
    			<Button @tap="setIngredient">+</Button>

				</FlexboxLayout>
			</StackLayout>
		</ScrollView>
		
		

</template>

<script>
	const appSettings = require('tns-core-modules/application-settings')

	export default {
		name: 'FormIngredients',

		data() {
			return {
				ingredientsData: [
					'Hello',
					'Gday'
					
				],

				unitPickerShown: false,

				units: [],
				unitIndex: null,

				amt: '',
				ingredient: ''
			}
		},

		computed: {
			selectedUnit() {
				return this.units[this.unitIndex]
			}
		},

		methods: {
			setUnitIndex(val) {
				this.unitIndex = val
			},

			setIngredient() {
				if (!this.amt || !this.ingredient) return
				this.ingredientsData.push(this.amt + " " + this.selectedUnit + " " + this.ingredient)

				this.ingredient = ''
				this.amt = ''

			},

			toggleUnitPicker() {
				this.unitPickerShown = !this.unitPickerShown
			}
		},

		created() {
			const units = JSON.parse(appSettings.getString('units'))
			const defaultUnitIndex = appSettings.getNumber('defaultUnitIndex')

			this.units = units
			this.unitIndex = defaultUnitIndex
		}
	}
</script>

<style lang="scss" scoped>

</style>