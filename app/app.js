import Vue from "nativescript-vue";
import Vuex from 'vuex'
import store from './store'

import Home from "./pages/Home";

Vue.use(Vuex)

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