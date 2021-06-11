<template>
  <v-container class="scythe-scores">
    <h1 class="text-h2 text-center">Scythe scores</h1>

    <v-radio-group v-model="typeResults" row>
      <v-radio label="Meilleurs" value="best" />
      <v-radio label="Pires" value="worst" />
      <v-radio label="Moyenne" value="average" />
    </v-radio-group>

    <ScytheResultsTable :factions="factions" :results="results" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import factions from "@/assets/json/scythe-factions.json";
import ScytheResultsTable from "@/components/ScytheResultsTable.vue";
import ScoreService from "@/services/ScoreService";
import { ScytheFaction, ScytheGame } from "@/types";

export default Vue.extend({
  name: "scythe-scores",

  components: {
    ScytheResultsTable,
  },

  data() {
    return {
      factions: [] as ScytheFaction[],
      games: [] as ScytheGame[],
      results: [] as { [key: string]: any },
      typeResults: "best",
      bestResults: [] as { [key: string]: any },
      worstResults: [] as { [key: string]: any },
      averageResults: [] as { [key: string]: any },
    };
  },

  watch: {
    typeResults(val) {
      switch (val) {
        case "worst":
          if (!this.worstResults.length) {
            this.worstResults = this.getWorstResults();
          }
          this.results = this.worstResults;
          break;
        case "average":
          if (!this.averageResults.length) {
            this.averageResults = this.getAverageResults();
          }
          this.results = this.averageResults;
          break;
        case "best":
        default:
          this.results = this.bestResults;
      }
    },
  },

  created() {
    this.games = ScoreService.getGames("scythe");
    /* ScoreService.getGames("scythe").then((games) => {
      this.games = games;
    }); */

    this.factions = factions;
    this.bestResults = this.getBestResults();
    this.results = this.bestResults;
  },

  methods: {
    getBestResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (
          !results[game.automa.faction][game.human.faction] ||
          game.human.score >
            results[game.automa.faction][game.human.faction].human.score
        ) {
          results[game.automa.faction][game.human.faction] = game;
        }
      });
      return results;
    },

    getWorstResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (
          !results[game.automa.faction][game.human.faction] ||
          game.human.score <
            results[game.automa.faction][game.human.faction].human.score
        ) {
          results[game.automa.faction][game.human.faction] = game;
        }
      });
      return results;
    },

    getAverageResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (!results[game.automa.faction][game.human.faction]) {
          results[game.automa.faction][game.human.faction] = [];
        }
        results[game.automa.faction][game.human.faction].push({
          human: game.human.score,
          automa: game.automa.score,
        });
      });
      for (const automaFaction in results) {
        for (const humanFaction in results[automaFaction]) {
          const scores = [...results[automaFaction][humanFaction]];
          let humanScores = 0;
          let automaScores = 0;
          scores.forEach((score) => {
            humanScores += score.human;
            automaScores += score.automa;
          });
          const humanAverage = Math.round(humanScores / scores.length);
          const automaAverage = Math.round(automaScores / scores.length);
          results[automaFaction][humanFaction] = {};
          results[automaFaction][humanFaction].human = {
            faction: humanFaction,
            score: humanAverage,
            winner: humanAverage > automaAverage,
          };
          results[automaFaction][humanFaction].automa = {
            faction: automaFaction,
            score: automaAverage,
            winner: automaAverage > humanAverage,
          };
        }
      }
      return results;
    },
  },
});
</script>

<style>
.scythe-scores .v-input--radio-group__input {
  justify-content: center;
}
</style>
