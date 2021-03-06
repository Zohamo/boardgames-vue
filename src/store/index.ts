import Vue from "vue";
import Vuex from "vuex";
import { version, authors, dependencies } from "../../package.json";
import players from "@/assets/json/players.json";
import magicAbilities from "@/assets/json/magic-abilities.json";
import scytheFactions from "@/assets/json/scythe-factions.json";
import scythePlays from "@/assets/json/scythe-plays.json";
import tapestryCivilizations from "@/assets/json/tapestry-civilizations.json";
import tapestryPlays from "@/assets/json/tapestry-plays.json";
import tapestryScenarios from "@/assets/json/tapestry-scenarios.json";
import {
  Game,
  Player,
  ScytheFaction,
  ScythePlay,
  TapestryCivilization,
  TapestryPlay,
  TapestryScenario,
} from "@/types";

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

    players: players as Player[],

    magicAbilities: magicAbilities.sort(function (a, b) {
      if (a.nameFr < b.nameFr) {
        return -1;
      }
      if (a.nameFr > b.nameFr) {
        return 1;
      }
      return 0;
    }) as MagicAbility[],

    scythePlays: scythePlays as ScythePlay[],
    scytheFactions: scytheFactions as ScytheFaction[],

    tapestryPlays: tapestryPlays.map((play) => {
      play.players.map((playerFromPlay) => {
        if (playerFromPlay.civilizationSlug) {
          playerFromPlay.civilization = tapestryCivilizations.find(
            (civ) => civ.slug === playerFromPlay.civilizationSlug
          );
          delete playerFromPlay.civilizationSlug;
        }
        return Object.assign(
          playerFromPlay,
          players.find(
            (playerFromList) => playerFromPlay.id === playerFromList.id
          ) || {}
        );
      });
      if (play.scenarioId) {
        play.scenario = tapestryScenarios.find(
          (scenario) => play.scenarioId === scenario.id
        );
        delete play.scenarioId;
      }
      return play;
    }) as TapestryPlay[],
    tapestryCivilizations: tapestryCivilizations as TapestryCivilization[],
    tapestryScenarios: tapestryScenarios as TapestryScenario[],
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
