<template>
  <v-container fluid>
    <v-data-iterator
      :items="filteredGames"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="my-2">
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="search"
                clearable
                fixed
                flat
                solo
                filled
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Rechercher"
              />
            </v-col>

            <v-col
              v-show="$vuetify.breakpoint.mdAndUp"
              cols="12"
              sm="4"
              class="d-flex align-center"
            >
              <v-select
                v-model="sortBy"
                flat
                solo
                filled
                hide-details
                :items="attributes"
                item-text="label"
                item-value="key"
                prepend-inner-icon="mdi-sort"
                label="Trier par"
                class="mx-4"
              ></v-select>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn depressed :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn depressed :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>

            <v-col cols="12" sm="5" class="d-flex align-center">
              <span class="primary--text">{{ filter.players[0] }}</span>
              <v-range-slider
                v-model="filter.players"
                :max="rangePlayers.max"
                :min="rangePlayers.min"
                hide-details
                class="align-center"
              />
              <span class="primary--text">{{ filter.players[1] }}</span>
              <v-btn-toggle v-model="filterOn" class="ml-2">
                <v-btn depressed :value="true">
                  <v-icon>mdi-filter</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="game in items" :key="game.id">
            <GameCard :game="game" />
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import GameCard from "@/components/GameCard.vue";
import GameService from "@/services/GameService";
import { Game } from "@/types";

export default Vue.extend({
  name: "BoardGames",

  components: {
    GameCard,
  },

  data: () => ({
    loading: true,
    games: [] as Game[],
    filteredGames: [] as Game[],
    itemsPerPage: -1,
    search: "" as string,
    filterOn: false,
    filter: {
      players: [2, 6],
    },
    sortDesc: false as boolean,
    sortBy: "bggWeight" as string,
    attributes: [
      {
        label: "Difficulté",
        key: "bggWeight",
      },
      {
        label: "Durée min.",
        key: "duration.min",
      },
      {
        label: "Nb. joueurs min.",
        key: "players.min",
      },
      {
        label: "Nb. joueurs max.",
        key: "players.max",
      },
      {
        label: "Nom",
        key: "title",
      },
      {
        label: "Thème",
        key: "theme",
      },
    ] as { label: string; key: string }[],
    rangePlayers: {
      min: 1,
      max: 10,
    },
  }),

  created() {
    GameService.getGames().then((games) => {
      this.games = games;
      this.filteredGames = [...games];
      this.setRangePlayers();
      this.loading = false;
    });
  },

  watch: {
    filterOn: function (val) {
      this.filteredGames = val ? this.filterPlayers() : [...this.games];
    },
    filter: {
      handler: function (val, oldVal) {
        this.filteredGames = this.filterOn
          ? this.filterPlayers()
          : [...this.games];
      },
      deep: true,
    },
  },

  methods: {
    setRangePlayers: function () {
      this.games.forEach((game) => {
        if (!game.players.max) {
          game.players.max = game.players.min;
        }
        if (game.players.max > this.rangePlayers.max) {
          this.rangePlayers.max = game.players.max;
        }
      });
    },

    filterPlayers: function () {
      return this.games.filter((game) => {
        if (!game.players.max) {
          game.players.max = game.players.min;
        }
        return (
          game.players.min <= this.filter.players[0] &&
          game.players.max >= this.filter.players[1]
        );
      });
    },
  },
});
</script>
