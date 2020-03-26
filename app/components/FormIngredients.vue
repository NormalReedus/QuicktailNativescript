<template>
  <ListPicker v-if="unitPickerShown" :items="units" :selectedIndex="unitIndex" @selectedIndexChange="setUnitIndex($event)" @tap="toggleUnitPicker"/>

  <ScrollView v-else>
    <StackLayout orientation="vertical" class="m-x-15">
      <FlexboxLayout v-for="ingredient of ingredientsData" :key="ingredient" alignItems="center" justifyContent="flex-end">
        <Label flexGrow="1">{{ ingredient }}</Label>
        <Button class="-rounded-lg" @tap="removeIngredient(ingredient)">x</Button>
      </FlexboxLayout>

      <FlexboxLayout alignItems="center" class="nt-input">
        <TextField hint="Amount" keyboardType="number" v-model="amt" class="-border -rounded" />
        <Button @tap="toggleUnitPicker" class="-rounded-lg" >{{ selectedUnit }}</Button>
        <TextField
          hint="Ingredient"
          class="nt-input -border -rounded"
          flexGrow="1"
          v-model="ingredient"
          @returnPress="addIngredient"
        />
        <Button @tap="addIngredient" class="-rounded-lg">+</Button>
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
			unitPickerShown: false,

			units: [],
			unitIndex: null,

			amt: '',
			ingredient: '',
		}
	},

	computed: {
		ingredientsData() {
			return this.$store.state.ingredientsData
		},

		selectedUnit() {
			return this.units[this.unitIndex]
		},
	},

	methods: {
		setUnitIndex({ value }) {
			this.unitIndex = value
		},

		addIngredient() {
			if (!this.amt || !this.ingredient) return

			const data = this.amt + ' ' + this.selectedUnit + ' ' + this.ingredient

			this.$store.commit('add', { array: 'ingredientsData', data })

			this.ingredient = ''
			this.amt = ''
		},

		removeIngredient(data) {
			this.$store.commit('remove', { array: 'ingredientsData', data })
		},

		toggleUnitPicker() {
			this.unitPickerShown = !this.unitPickerShown
		},
	},

	created() {
		const units = JSON.parse(appSettings.getString('units'))
		const defaultUnitIndex = appSettings.getNumber('defaultUnitIndex')

		this.units = units
		this.unitIndex = defaultUnitIndex
	},
}
</script>

<style lang="scss" scoped>
button {
	width: 10;
}
</style>