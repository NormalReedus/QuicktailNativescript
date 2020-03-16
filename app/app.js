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
				// Default glasses:
				initGlassTypes() {
						appSettings.setString('glassTypes', defaults.glassTypes)
				},
			
				// Default ices:
				initIceTypes() {
						appSettings.setString('iceTypes', defaults.iceTypes)
				},

				// Default methods:
				initMethods() {
						appSettings.setString('methods', defaults.methods)
				},

				// Default garnishes:
				initGarnishes() {
						appSettings.setString('garnishes', defaults.garnishes)
				}
		},
		
		created() {
			if (!appSettings.hasKey('glassTypes')) {
				this.initGlassTypes()
			}
			
			if (!appSettings.hasKey('iceTypes')) {
				this.initIceTypes()
			}
			
			if (!appSettings.hasKey('methods')) {
				this.initMethods()
			}
			
			if (!appSettings.hasKey('garnishes')) {
				this.initGarnishes()
			}	
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
