import Vue from "vue";
import Vuex from "vuex";
import { version, authors, dependencies } from "../../package.json";
import players from "@/assets/json/players.json";
import mtgAbilities from "@/assets/json/mtg-abilities.json";
import scytheFactions from "@/assets/json/scythe-factions.json";
import scythePlays from "@/assets/json/scythe-plays.json";
import tapestryCivilizations from "@/assets/json/tapestry-civilizations.json";
import tapestryPlays from "@/assets/json/tapestry-plays.json";
import tapestryScenarios from "@/assets/json/tapestry-scenarios.json";
import {
  Game,
  MtgAbility,
  MtgSet,
  Player,
  ScytheFaction,
  ScythePlay,
  TapestryCivilization,
  TapestryPlay,
  TapestryPlayer,
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

    mtgAbilities: mtgAbilities.sort(function (a, b) {
      if (a.nameFr < b.nameFr) {
        return -1;
      }
      if (a.nameFr > b.nameFr) {
        return 1;
      }
      return 0;
    }) as MtgAbility[],
    mtgSets: [] as MtgSet[],

    scythePlays: scythePlays as ScythePlay[],
    scytheFactions: scytheFactions as ScytheFaction[],

    tapestryCivilizations: tapestryCivilizations as TapestryCivilization[],
    tapestryScenarios: tapestryScenarios as TapestryScenario[],
    tapestryPlays: tapestryPlays.map((play: TapestryPlay) => {
      play.players.map((playerFromPlay: TapestryPlayer) => {
        if (playerFromPlay.civilizationSlug) {
          const civilization = tapestryCivilizations.find(
            (civ) => civ.slug === playerFromPlay.civilizationSlug
          );
          if (civilization) {
            playerFromPlay.civilization = civilization;
          }
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
  },

  mutations: {
    SET_PROMISE(state, promise): void {
      state.promise = promise;
    },
    SET_GAMES(state, games): void {
      state.games = games;
    },
    SET_MTG_SETS(state, mtgSets): void {
      state.mtgSets = mtgSets;
    },
  },

  actions: {
    async getGames({ state, commit }): Promise<void | Game[]> {
      if (state.games.length > 1) {
        return state.games;
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

    async getGame({ state, commit }, { slug }): Promise<void | Game> {
      if (
        state.games.length &&
        state.games.find((game) => game.slug == slug)?.mechanisms?.length
      ) {
        return state.games.find((game) => game.slug == slug);
      }

      const promise = fetch(`${process.env.VUE_APP_API_URL}/boardgames/${slug}`)
        .then((res) => res.json())
        .then((res) => {
          if (state.games.length) {
            commit(
              "SET_GAMES",
              state.games.map((game) => (game.slug == slug ? res : game))
            );
          } else {
            commit("SET_GAMES", [res]);
          }
        })
        .catch((error) => {
          console.log("getGame", error);
        });

      commit("SET_PROMISE", promise);

      return promise;
    },

    async getMtgSets({ state, commit }): Promise<void | MtgSet[]> {
      if (state.mtgSets.length) {
        return state.mtgSets;
      }

      const promise = fetch(
        "https://api.magicthegathering.io/v1/sets?type=archenemy|arsenal|box|commander|core|draft_innovation|expansion|funny|masters"
      )
        .then((res) => res.json())
        .then((res) => {
          commit(
            "SET_MTG_SETS",
            res.sets.filter((set: MtgSet) => !set.onlineOnly)
          );
        })
        .catch((error) => {
          console.log("getMtgSets", error);
        });

      commit("SET_PROMISE", promise);

      return promise;
    },
  },
});
