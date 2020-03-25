import Vue from "nativescript-vue";
import Vuex from 'vuex'
import store from './store'

import Home from "./views/Home";

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
}).$start();