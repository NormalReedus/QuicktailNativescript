import Vue from "nativescript-vue";
const appSettings = require('tns-core-modules/application-settings')
import defaults from '@/components/defaults.js'

import Home from "./pages/Home";

new Vue({

    template: `
        <Frame class="ns-dark">
            <Home/>
        </Frame>`,

    components: {
        Home
		},

		methods: {
			
		},
		
		created() {
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
