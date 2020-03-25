<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="home">
      <Label class="h1 greeting" textWrap="true">What would you like to do?</Label>

      <FlexboxLayout>
        <FlexboxLayout class="button-container">
          <Image src="~/create_btn.png" @tap="navToCreate" class="m-x-25 img" />
          <Label class="h2">Create</Label>
        </FlexboxLayout>

        <FlexboxLayout class="button-container">
          <Image src="~/cocktails_btn.png" @tap="navToCocktails" class="m-x-25 img" />
          <Label class="h2">Cocktails</Label>
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- TEST -->
      <TextField v-model="keyToFind" hint="Find Key..." width="200" />
      <Button @tap="key" class="-primary">Key</Button>
      <Button @tap="keys">All Keys</Button>
      <Button @tap="test">Test</Button>
      <Button @tap="clear">Clear</Button>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Create from './Create'
import Cocktails from './Cocktails'
const appSettings = require('tns-core-modules/application-settings')

export default {
	name: 'Home',
	components: {
		Create,
		Cocktails,
	},

	data() {
		return {
			keyToFind: '',
		}
	},

	methods: {
		navToCreate() {
			this.$navigateTo(Create)
		},

		navToCocktails() {
			this.$navigateTo(Cocktails)
		},

		key() {
			console.log(appSettings.getString(this.keyToFind))
		},

		keys() {
			console.log(appSettings.getAllKeys())
		},

		test() {
			console.log(JSON.parse(appSettings.getString('cocktails'))[0])
		},

		clear() {
			appSettings.setString('cocktails', '[]')
		},
	},
}
</script>

<style scoped>
.home {
	justify-content: center;
	align-items: center;
	/* height: 100%; */
}

.greeting {
	margin-bottom: 40;
}

.button-container {
	width: 45%;

	flex-direction: column;
	align-items: center;
}

.img {
	box-shadow: 10 10 10 black;
}
</style>