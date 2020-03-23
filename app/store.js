import Vue from "nativescript-vue";
import Vuex from 'vuex'
const appSettings = require('tns-core-modules/application-settings')

import { Cocktail } from '@/components/classes'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// Available components for creating cocktails:
		glasses: JSON.parse(appSettings.getString('glasses')),
		ices: JSON.parse(appSettings.getString('ices')),
		methods: JSON.parse(appSettings.getString('methods')),
		garnishes: JSON.parse(appSettings.getString('garnishes')),

		// Selected components when creating cocktails:
		glassData: null,
		iceData: null,
		methodData: null,
		ingredientsData: ["5 cl Vodka"],//null,
		garnishData: null,
		miscData: null,

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

		saveCocktail(state) {
			state.cocktails = JSON.parse(appSettings.getString('cocktails'))

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
		},

		discardCocktail(state) {
			state.glassData = null
			state.iceData = null
			state.methodData = null
			state.ingredientsData = null
			state.garnishData = null
			state.miscData = null
		}
	}
})

// Returns true if element was removed, false if not:
Array.prototype.remove = function(value) {
	const i = this.indexOf(value)
	
	if (i === -1) return false

	this.splice(i, 1)

	return true
}