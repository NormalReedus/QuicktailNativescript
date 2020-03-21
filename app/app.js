import Vue from "nativescript-vue";
import Vuex from 'vuex'
import store from './store'

import defaults from '@/components/defaults.js'

import Home from "./pages/Home";

const appSettings = require('tns-core-modules/application-settings')

Vue.use(Vuex)

setupDefaults()

new Vue({
		store,

    template: `
        <Frame class="ns-dark">
            <Home/>
        </Frame>`,

    components: {
        Home
		},

		// data() {
		// 	return {
		// 		darkTheme: true
		// 	}
		// },

		// computed: {
		// 	themeClass() {
		// 		return this.darkTheme ? 'ns-dark' : 'ns-light'
		// 	}
		// },

		// methods: {
		// 	changeTheme(event) {
		// 		console.log('cought ' + event)
		// 		// console.log('Val: ' + value)
		// 		// console.log('Theme: ' + this.darkTheme)
		// 		// this.darkTheme = value
		// 		// console.log('New Theme: ' + this.darkTheme)
		// 	}
		// }
}).$start();


//* Loads default values etc into appSettings if first boot:
function setupDefaults() {
	// if (!appSettings.hasKey('units')) {
		appSettings.setString('units', defaults.units)
	// }

	// if (!appSettings.hasKey('selectedUnitIndex')) {
		appSettings.setNumber('defaultUnitIndex', defaults.defaultUnitIndex)
	// }

	// if (!appSettings.hasKey('glasses')) {
		appSettings.setString('glasses', defaults.glasses)
	// }
	
	// if (!appSettings.hasKey('ices')) {
		appSettings.setString('ices', defaults.ices)
	// }
	
	// if (!appSettings.hasKey('methods')) {
		appSettings.setString('methods', defaults.methods)
	// }
	
	// if (!appSettings.hasKey('garnishes')) {
		appSettings.setString('garnishes', defaults.garnishes)
	// }	

	// if (!appSettings.hasKey('cocktails')) {
		appSettings.setString('cocktails', '[]')
	// }
}