import Vue from "vue";
import Vuex from "vuex";
import { version, authors, dependencies } from '../../package.json'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appUrl: process.env.BASE_URL,
        author: authors[0],
        appVersion: version,
        vueUrl: "https://vuejs.org",
        vueVersion: dependencies.vue.replace('^', '')
    },

    getters: {},

    mutations: {},

    actions: {}
})