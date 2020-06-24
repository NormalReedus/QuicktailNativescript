import Vue from "nativescript-vue"
import Vuex from 'vuex'
import store from './store'

// To navigate outside components:
import { topmost } from 'tns-core-modules/ui/frame'

// Back button manipulation:
import * as application from 'tns-core-modules/application'

// Components:
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)
Vue.registerElement("PickerField", () => require("nativescript-picker/picker").PickerField)


import Cocktails from "./views/Cocktails";

Vue.use(Vuex)

const vue = new Vue({
	store,

	template: `
        <Frame>
            <Cocktails />
        </Frame>`,

	components: {
		Cocktails
	},
}).$start()



// When pressing the 'back' button:
application.android.on(
	application.AndroidApplication.activityBackPressedEvent,
	async args => {
		// Disregard if not on Create page:
		if (!store.state.onCreatePage) return

		// Prevents default:
		args.cancel = true
	
		// Asks before discarding:
		const success = await store.dispatch('discardCocktail')
		if (success) topmost().currentPage.__vuePageRef__.$navigateBack()
	}
)