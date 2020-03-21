<template>
		<ListPicker v-if="unitPickerShown" :items="units" :selectedIndex="unitIndex" @selectedIndexChange="setUnitIndex($event.value)" @tap="toggleUnitPicker"/>
		
		<ScrollView v-else>
			<StackLayout orientation="vertical" class="m-x-15">
				<FlexboxLayout v-for="ingredient of ingredientsData" :key="ingredient" alignItems="center" justifyContent="flex-end" >
					<Label flexGrow="1">{{ ingredient }}</Label>
					<Button class="-rounded-lg" @tap="test($event.object.className)">x</Button>
				</FlexboxLayout>

				<FlexboxLayout alignItems="center">
					
					<TextField hint="Amount" keyboardType="number" v-model="amt"></TextField>
					<Button @tap="toggleUnitPicker" class="-rounded-lg">{{ selectedUnit }}</Button>
        	<TextField hint="Ingredient" class="nt-input" flexGrow="1" v-model="ingredient" @returnPress="setIngredient"></TextField>
    			<Button @tap="setIngredient" class="-rounded-lg">+</Button>

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

				this.set(this.ingredientsData)
			},

			test(e) {
				console.log(e)
			},

			// Ved slettelse af ingredient skal vi også kalde this.set() igen

			toggleUnitPicker() {
				this.unitPickerShown = !this.unitPickerShown
			},

			set(ingredientsData) {
				if (this.ingredientsData.length === 0) return
				
				this.$emit('input', ingredientsData)
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


Button {
	width: 10;
}
</style>