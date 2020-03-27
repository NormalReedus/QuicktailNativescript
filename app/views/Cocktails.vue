<template>
  <Page>
    <ActionBar title="Cocktails">
      <StackLayout
        orientation="horizontal"
        ios:horizontalAlignment="center"
        android:horizontalAlignment="center"
      >
        <Label class="h2">Cocktails</Label>
      </StackLayout>
    </ActionBar>

		<GridLayout>
    <ScrollView row="0">
    	<StackLayout>
          <Image v-for="cocktail of cocktails" :key="cocktail.imgSrc" :src="cocktail.imgSrc"/>
      </StackLayout>
    </ScrollView>

		<AbsoluteLayout marginTop="87%" marginLeft="80%" row="0">
			<ActionButton />
		</AbsoluteLayout>
		</GridLayout>
  </Page>
</template>

<script>
import Create from './Create'
import ActionButton from '@/components/ActionButton'


export default {
	name: 'Cocktails',

	components: {
		Create,
		ActionButton
	},

	data() {
		return {
			
		}
	},

	computed: {
		cocktails() {
			return this.$store.state.cocktails
		},
	},

	created() {
		console.log(this.$store.state.cocktails.length)
	}
}
</script>

<style>
</style>