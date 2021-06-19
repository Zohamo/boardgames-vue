import Vue from "vue";
import Vuex from "vuex";
import { version, authors, dependencies } from "../../package.json";
import { Game } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appUrl: process.env.BASE_URL,
    author: authors[0],
    appVersion: version,
    vueUrl: "https://vuejs.org",
    vueVersion: dependencies.vue.replace("^", ""),

    promise: null,

    games: [] as Game[],
  },

  mutations: {
    SET_PROMISE(state, promise): void {
      state.promise = promise;
    },
    SET_GAMES(state, games): void {
      state.games = games;
    },
  },

  actions: {
    async getGames({ state, commit }): Promise<Game[]> {
      if (state.games.length) {
        return state.games;
      }

      if (state.promise) {
        return state.promise;
      }

      const promise = fetch(`${process.env.VUE_APP_API_URL}/boardgames`)
        .then((res) => res.json())
        .then((res) => {
          commit("SET_GAMES", res);
        })
        .catch((error) => {
          console.log("getGames", error);
        });

      commit("SET_PROMISE", promise);

      return promise;
    },
  },
});
