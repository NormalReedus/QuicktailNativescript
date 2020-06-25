<template>
  <ScrollView>
    <StackLayout orientation="vertical">
      <FlexboxLayout
        v-for="ingredient of ingredients"
        :key="ingredient"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Label flexGrow="1">{{ ingredient }}</Label>
        <Button @tap="removeIngredient(ingredient)">x</Button>
      </FlexboxLayout>

      <FlexboxLayout alignItems="center" class="add-ingredient-line">
        <TextField hint="Amount" keyboardType="number" v-model="amt" width="18%" />

        <!-- <DropDown
          :items="units"
          :selectedIndex="unitIndex"
          class="dropdown"
          @selectedIndexChanged="setUnitIndex"
					itemsTextAlignment="center"
					itemsPadding="5"
        /> -->

				<!-- TEST -->
			<PickerField pickerTitle="Select a measurement" :items="units" :text="selectedUnit" @textChange="onUnitChange" />
			<!-- TEST -->

				<!-- Width="50%" makes sure it doesn't expand with text, flexGrow makes it take up all available space -->
        <TextField
          hint="Ingredient"
          v-model="ingredient"
          @returnPress="addIngredient"
					width="50%"
					flexGrow="1"
        />

        <Label @tap="addIngredient" class="btn-add fas"></Label>
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
		ingredients() {
			return this.$store.state.ingredients
		},

		selectedUnit() {
			return this.units[this.unitIndex]
		},
	},

	methods: {
		onUnitChange({ object }) {
			this.unitIndex = object.selectedIndex
		},

		addIngredient() {
			if (!this.amt || !this.ingredient) return

			const data = this.amt + ' ' + this.selectedUnit + ' ' + this.ingredient

			this.$store.commit('add', {
				array: 'ingredients',
				data,
			})

			this.ingredient = ''
			this.amt = ''
		},

		removeIngredient(data) {
			this.$store.commit('remove', {
				array: 'ingredients',
				data,
			})
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
@import '../variables';

.add-ingredient-line {
	// Everything except for the first child:
	* + * {
		margin-left: 10;
	}

	.btn-add {
		font-size: 18;
		border-radius: 50%;
		color: $primary3;
	}

	PickerField {
		background: $primary2;
		border-radius: 3;
		padding: 2 10;
	}
}
</style>