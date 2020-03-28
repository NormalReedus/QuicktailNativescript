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
          <FlexboxLayout background="orangered" width="56" height="56" borderRadius="0, 28, 28, 0" marginLeft="-15" alignItems="center" justifyContent="center">
						<GridLayout rows="2, auto" horizontalAlignment="center" height="16" width="16" class="sidebar-btn">
            	<Label row="1" class="sb-btn-dash--1" />
              <Label row="1" class="sb-btn-dash--2" />
            </GridLayout>
					</FlexboxLayout>
        </AbsoluteLayout>

        <!-- Add button -->
        <AbsoluteLayout marginTop="87%" marginLeft="80%" row="0">
          <!-- <ActionButton /> -->
          <!-- <Image src="~/action_btn.png" @tap="$navigateTo(Create)" height="56" width="56" /> animate -->
          <FlexboxLayout @tap="goToCreatePage" background="orangered" width="56" height="56" borderRadius="28" alignItems="center" justifyContent="center">
            <GridLayout rows="2, auto" horizontalAlignment="center" height="16" width="16">
            	<Label row="1" class="add-btn-dash--1" />
              <Label row="1" class="add-btn-dash--2" />
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
			actionBtnSpinning: false,
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

		goToCreatePage() {
			this.$navigateTo(Create)

			this.actionBtnSpinning = !this.actionBtnSpinning
			console.log(this.actionBtnSpinning)
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
.add-btn-dash--1,
.add-btn-dash--2 {
	background-color: #fff;
	transform: translate(0, -2);
	height: 16;
	width: 3;
}
.add-btn-dash--1 {
	transform: rotate(90deg) translate(0, -2);
}

.sidebar-btn {
	transform: translateX(5)
}
.sb-btn-dash--1,
.sb-btn-dash--2 {
	background-color: #fff;
	height: 16;
	width: 3;
}
.sb-btn-dash--1 {
	transform: rotate(-45deg) translate(0, -7);
}
.sb-btn-dash--2 {
	transform: rotate(45deg) translate(0, 3);
}



</style>>
