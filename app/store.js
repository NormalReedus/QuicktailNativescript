import Vue from "nativescript-vue";
import Vuex from 'vuex'
import defaults from '@/components/defaults.js'

const appSettings = require('tns-core-modules/application-settings')
setupDefaults() // Default glasses etc in appSettings

const fs = require('tns-core-modules/file-system')
clearCocktails()

import { Cocktail } from '@/components/classes'

Vue.use(Vuex)

//const util = require('util')
export default new Vuex.Store({
	state: {
		// Available components for creating cocktails:
		glasses: JSON.parse(appSettings.getString('glasses')),
		ices: JSON.parse(appSettings.getString('ices')),
		methods: JSON.parse(appSettings.getString('methods')),
		garnishes: JSON.parse(appSettings.getString('garnishes')),

		// Selected components when creating cocktails:
		id: '',
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

		// For array-manipulation:
		add(state, { array, data }) {
			state[array].push(data)
		},

		// For array-manipulation:
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

		saveCocktailData(state) {
			// state.cocktails = JSON.parse(appSettings.getString('cocktails'))

			state.cocktails.push(
				new Cocktail(
					state.id,
					state.glassData,
					state.iceData,
					state.methodData,
					state.ingredientsData,
					state.garnishData,
					state.miscData
				)
			)

			appSettings.setString('cocktails', JSON.stringify(state.cocktails))

			console.log(state.cocktails[state.cocktails.length - 1].imgSrc)
		},

		deleteCocktailData(state, { index }) {
			state.cocktails.splice(index, 1)

			appSettings.setString('cocktails', JSON.stringify(state.cocktails))
			console.log("Cocktail data removed")
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

	actions: {
		saveCocktail({ commit, state }) {
			return new Promise((resolve, reject) => {
				state.id = uniqueID()
				
				let save
				// Only save image, if one was chosen:
				if (state.miscData.imgSrc) {
					
					// First, the picture:
					const filename = genFilename(state.miscData.name, state.id)
					// The app's read + write folder, filename, and the full path is defined:
					const folder = fs.knownFolders.documents().path
					const path = fs.path.join(folder, filename)
					
					// We save the img to the specified path:
					const imageSource = state.miscData.imgSrc
					save = {
						saved: imageSource.saveToFile(path, 'png'),
						path
					}
				}
				
				// If no attempt of saving img was made, we keep going and just save cocktail with no pic
				// If attempt was made, but returned false, we log the error:
				if (save && !save.saved) {
					return reject(new Error('There was an error saving the selected image'))
				}
				
				// imgSrc is now set to the pathstring to the file (if pic was chosen), since type <imageSource> is only temp. until saving:
				commit('setNested', {
					path: [
						'miscData',
						'imgSrc'
					],
					val: save ? save.path : ''
				})
				
				commit('saveCocktailData')
				commit('discardCocktail') // Clears data
				
				return resolve()
			})
		},

		deleteCocktail({ commit, state }, { id }) {
			// Finds the index of the cocktail to be deleted:
			const index = state.cocktails.findIndex(cocktail => {
				cocktail.id == id
			})
			
			// The path to the image file:
			const { imgSrc } = state.cocktails[index]

			// Lets a mutation delete the data from Vuex and appSettings:
			commit('deleteCocktailData', { index })

			// Deletes the image from app storage:
			deleteImage(imgSrc)
		}
	},
})

// Returns true if element was removed, false if not:
Array.prototype.remove = function (value) {
	const i = this.indexOf(value)

	if (i === -1) return false

	this.splice(i, 1)

	return true
}

function genFilename(nameBase, id) {
	return `${nameBase}-${id}.png`
}

function uniqueID() {
	return Date.now()
}

async function deleteImage(path) {
	try {

		const file = fs.File.fromPath(path)

		await file.remove()

		console.log('Image deleted')

	} catch (err) {
		console.log(err)
	}
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

	//if (!appSettings.hasKey('cocktails')) {
	appSettings.setString('cocktails', '[]')
	//}
}


//! DEV

function clearCocktails() {
	//console.log(JSON.parse(appSettings.getString('cocktails')))
	//! Deletes all cockail images:
	fs.knownFolders.documents().getEntities().then(arr => {
		arr.forEach(e => {
			if (e._extension) e.remove()
		})
	})

	// appSettings.setString('cocktails', '[]')
}

