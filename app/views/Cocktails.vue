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

    <StackLayout>
      <TextField v-model="searchFilter" hint="Filter..." />
      <!-- Add looking glass icon and an x to clear -->

      <GridLayout>
        <ScrollView row="0">
          <FlexboxLayout flexWrap="wrap" padding="20" justifyContent="space-around">
            <StackLayout
              width="40%"
              v-for="cocktail of filteredCocktails"
              :key="cocktail.imgSrc"
              class="-circle"
              @tap="goToCocktailPage(cocktail)"
            >
              <Image :src="cocktail.imgSrc" />
              <Label>{{ cocktail.name }}</Label>
            </StackLayout>
          </FlexboxLayout>
          <!-- <StackLayout>
          <Image v-for="cocktail of cocktails" :key="cocktail.imgSrc" :src="cocktail.imgSrc" />
          </StackLayout>-->
        </ScrollView>

				<!-- Sidebar button -->
        <AbsoluteLayout marginTop="87%" row="0">
          <StackLayout
            background="orangered"
            width="56"
            height="56"
            borderRadius="0, 28, 28, 0"
            
          ></StackLayout>
        </AbsoluteLayout>

				<!-- Action button - add cocktail -->
        <AbsoluteLayout marginTop="87%" marginLeft="80%" row="0">
          <!-- <ActionButton /> -->
          <!-- <Image src="~/action_btn.png" @tap="$navigateTo(Create)" height="56" width="56" /> animate -->
          <FlexboxLayout background="orangered" width="56" height="56" borderRadius="28" alignItems="center" justifyContent="center">
            <GridLayout
              rows="*"
              horizontalAlignment="center"
							height="16"
							width="16"
							background="blue"
            >
              <Label row="1" class="ab-dash--1" />
              <Label row="1" class="ab-dash--2" />
            </GridLayout>
          </FlexboxLayout>
        </AbsoluteLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Create from './Create'
import Cocktail from './Cocktail'
// import ActionButton from '@/components/ActionButton'

export default {
	name: 'Cocktails',

	components: {
		Cocktail,
	},

	data() {
		return {
			Create,
			// Cocktail
			searchFilter: '',
		}
	},

	computed: {
		cocktails() {
			return this.$store.state.cocktails
		},

		filteredCocktails() {
			return this.searchFilter
				? this.cocktails.filter(cocktail =>
						cocktail.name
							.toLowerCase()
							.includes(this.searchFilter.toLowerCase())
				  )
				: this.cocktails
		},
	},

	methods: {
		goToCocktailPage(cocktail) {
			this.$navigateTo(Cocktail, {
				props: {
					cocktail,
				},
			})
		},

		test(event) {
			console.log(event)
		},
	},

	mounted() {
		// console.log(this.$store.state.cocktails.length)
		// this.$showModal(Cocktail)
	},
}
</script>

<style lang="scss" scoped>
.ab-dash--1, .ab-dash--2 {
		background-color: #fff;
		transform: translate(0, -2);
		height: 16;
		width: 3;
	}

	.ab-dash--1 {
		transform: rotate(90deg) translate(0, -2);
	}
</style>>
