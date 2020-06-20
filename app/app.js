import Vue from "nativescript-vue";
import Vuex from 'vuex'
import store from './store'

// import Home from "./views/Home";
import Cocktails from "./views/Cocktails";

Vue.use(Vuex)

new Vue({
	store,

	template: `
        <Frame class="ns-dark">
            <Cocktails />
        </Frame>`,

	components: {
		Cocktails
	},
}).$start();