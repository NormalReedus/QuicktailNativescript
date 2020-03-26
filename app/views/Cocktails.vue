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

    <ScrollView>
    	<StackLayout>
        <!-- <FlexboxLayout flexDirection="column" v-for="cocktail of cocktails" :key="cocktail.imgSrc"> -->
					<!-- <Label class="text-primary">Name</!--> --> -->
          <Image v-for="cocktail of cocktails" :key="cocktail.imgSrc" :src="cocktail.imgSrc"/>
        <!-- </FlexboxLayout> -->
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
	name: 'Cocktails',

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