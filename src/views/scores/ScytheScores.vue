<template>
  <v-container class="scythe-scores">
    <h1 class="text-h2 text-center">Scythe scores</h1>

    <v-radio-group v-model="typeResults" row>
      <v-radio label="Meilleurs" value="best" />
      <v-radio label="Pires" value="worst" />
      <v-radio label="Moyenne" value="average" />
    </v-radio-group>

    <ScytheResultsTable :factions="scytheFactions" :results="results" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import ScytheResultsTable from "@/components/ScytheResultsTable.vue";
import { ScythePlay } from "@/types";

export default Vue.extend({
  name: "scythe-scores",

  components: {
    ScytheResultsTable,
  },

  data() {
    return {
      results: [] as { [key: string]: any },
      typeResults: "best",
      bestResults: [] as { [key: string]: any },
      worstResults: [] as { [key: string]: any },
      averageResults: [] as { [key: string]: any },
    };
  },

  computed: {
    ...mapState(["scythePlays", "scytheFactions"]),
  },

  beforeMount() {
    this.bestResults = this.getBestResults();
    this.results = this.bestResults;
  },

  watch: {
    typeResults(val): void {
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

  methods: {
    getBestResults(): { [key: string]: any } {
      const results: { [key: string]: any } = [];
      this.scythePlays.forEach((play: ScythePlay) => {
        if (!results[play.automa.faction]) {
          results[play.automa.faction] = [];
        }
        if (
          !results[play.automa.faction][play.human.faction] ||
          play.human.score >
            results[play.automa.faction][play.human.faction].human.score
        ) {
          results[play.automa.faction][play.human.faction] = play;
        }
      });
      return results;
    },

    getWorstResults(): { [key: string]: any } {
      const results: { [key: string]: any } = [];
      this.scythePlays.forEach((play: ScythePlay) => {
        if (!results[play.automa.faction]) {
          results[play.automa.faction] = [];
        }
        if (
          !results[play.automa.faction][play.human.faction] ||
          play.human.score <
            results[play.automa.faction][play.human.faction].human.score
        ) {
          results[play.automa.faction][play.human.faction] = play;
        }
      });
      return results;
    },

    getAverageResults(): { [key: string]: any } {
      const results: { [key: string]: any } = [];
      this.scythePlays.forEach((play: ScythePlay) => {
        if (!results[play.automa.faction]) {
          results[play.automa.faction] = [];
        }
        if (!results[play.automa.faction][play.human.faction]) {
          results[play.automa.faction][play.human.faction] = [];
        }
        results[play.automa.faction][play.human.faction].push({
          human: play.human.score,
          automa: play.automa.score,
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
