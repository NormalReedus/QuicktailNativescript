<template>
  <Page>
    
  </Page>
</template>

<script>
import Create from './Create'
import Cocktails from './Cocktails'
const appSettings = require('tns-core-modules/application-settings')
const fsm = require('tns-core-modules/file-system')

export default {
	name: 'Home',
	components: {
		Create,
		Cocktails,
	},

	data() {
		return {
			Create,
			Cocktails,
			keyToFind: '',
		}
	},

	methods: {
		key() {
			console.log(appSettings.getString(this.keyToFind))
		},

		keys() {
			console.log(appSettings.getAllKeys())
		},

		test() {
			console.log(JSON.parse(appSettings.getString('cocktails')))
			fsm.knownFolders.documents().getEntities().then(arr => {
				arr.forEach(e => {
					console.log(e)
					// if (e._extension) e.remove()
				})
			})
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