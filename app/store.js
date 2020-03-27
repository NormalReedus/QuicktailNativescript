import Vue from "nativescript-vue";
import Vuex from 'vuex'
import defaults from '@/components/defaults.js'

const appSettings = require('tns-core-modules/application-settings')
setupDefaults() // Default glasses etc in appSettings

import { Cocktail } from '@/components/classes'

Vue.use(Vuex)

const util = require('util')
export default new Vuex.Store({
	state: {
		// Available components for creating cocktails:
		glasses: JSON.parse(appSettings.getString('glasses')),
		ices: JSON.parse(appSettings.getString('ices')),
		methods: JSON.parse(appSettings.getString('methods')),
		garnishes: JSON.parse(appSettings.getString('garnishes')),

		// Selected components when creating cocktails:
		glassData: '',
		iceData: '',
		methodData: '',
		ingredientsData: [], // Has to be empty array initially
		garnishData: '',
		miscData: {
			description: '',
			imgSrc: '',
			name: ''
		},

		// List to show:
		cocktails: JSON.parse(appSettings.getString('cocktails')),

		// Available units to choose from when creating cocktails:
		units: JSON.parse(appSettings.getString('units')),

		// Default unit chosen:
		defaultUnitIndex: JSON.parse(appSettings.getNumber('defaultUnitIndex')),
	},

	mutations: {
		update(state, { prop, data }) {
			state[prop] = data
		},

		add(state, { array, data }) {
			state[array].push(data)
		},

		remove(state, { array, data }) {
			state[array].remove(data)
		},

		setNested(state, { path, val }) {
			if (path.length === 0) {
				throw new Error("Object or properties does not exist")
			} else if (path.length === 1) {
				throw new Error("setNested should not be used with a path of length 1")
			}
			
			const ref = path.slice(0, -1)
			const prop = path[path.length - 1]
			
			ref.reduce((acc, cur) => acc[cur], state)[prop] = val
		},

		saveCocktail(state) {
			// state.cocktails = JSON.parse(appSettings.getString('cocktails'))

			state.cocktails.push(
				new Cocktail(
					state.glassData,
					state.iceData,
					state.methodData,
					state.ingredientsData,
					state.garnishData,
					state.miscData
				)
			)

			appSettings.setString('cocktails', JSON.stringify(state.cocktails))
			
			console.log(state.cocktails[0].imgSrc)
		},

		discardCocktail(state) {
			state.glassData = null
			state.iceData = null
			state.methodData = null
			state.ingredientsData = []
			state.garnishData = null
			state.miscData = {
				description: '',
				imgSrc: '',
				name: ''
			}
		}
	},
})

// Returns true if element was removed, false if not:
Array.prototype.remove = function(value) {
	const i = this.indexOf(value)
	
	if (i === -1) return false

	this.splice(i, 1)

	return true
}

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

	if (!appSettings.hasKey('cocktails')) {
		appSettings.setString('cocktails', '[]')
	}
}