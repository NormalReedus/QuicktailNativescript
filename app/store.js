import Vue from "nativescript-vue";
import Vuex from 'vuex'
const appSettings = require('tns-core-modules/application-settings')

import Cocktail from '@/components/classes'

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
		ingredientsData: null,
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
		update(state, payload) {
			state[payload.prop] = payload.val
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