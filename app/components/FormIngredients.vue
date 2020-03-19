<template>
		<ScrollView>
			<StackLayout orientation="vertical">
				<FlexboxLayout v-for="ingredient of ingredients" :key="ingredient">
					<Label>{{ ingredient }}</Label>
					<Button>x</Button>
				</FlexboxLayout>

				<FlexboxLayout>
					
        	<TextField hint="Add" class="nt-input m-x-15" flexGrow="1"></TextField>
    			
				</FlexboxLayout>
			</StackLayout>
		</ScrollView>
</template>

<script>
	export default {
		name: 'FormIngredients',

		data() {
			return {
				ingredients: [
					'Hello'
				]
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>