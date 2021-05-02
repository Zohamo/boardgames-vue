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
      <template v-slot:default="{ items }">
        <v-row>
          <v-col class="flex-grow-0">
            <v-navigation-drawer
              v-model="drawer"
              :mini-variant.sync="mini"
              floating
              permanent
              mini-variant-width="64"
            >
              <v-list-item dense class="pl-1">
                <v-list-item-content>
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
                </v-list-item-content>

                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-list-item>

              <v-list-item dense class="pl-1">
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
                />
                <v-btn
                  @click="sortDesc = !sortDesc"
                  plain
                  small
                  class="px-0"
                  style="min-width: inherit"
                >
                  <v-icon
                    v-text="sortDesc ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                  />
                </v-btn>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon class="mr-1">
                  <v-icon>mdi-filter</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Filtres</v-list-item-title>
              </v-list-item>

              <v-list v-show="!mini" dense>
                <v-list-item class="justify-space-between">
                  <v-btn-toggle v-model="filtersActive.players">
                    <v-btn
                      small
                      depressed
                      outlined
                      v-text="'Nombre de joueurs'"
                      color="primary"
                      :value="true"
                    />
                  </v-btn-toggle>
                  <v-btn-toggle v-model="filtersActive.playersRange">
                    <v-btn
                      small
                      depressed
                      outlined
                      class="px-0 ml-1"
                      style="min-width: inherit"
                      color="primary"
                      :value="true"
                    >
                      <v-icon v-text="'mdi-arrow-left-right'" />
                    </v-btn>
                  </v-btn-toggle>
                </v-list-item>

                <v-list-item class="mt-2">
                  <v-list-item-content style="overflow: visible">
                    <v-slider
                      v-show="!filtersActive.playersRange"
                      v-model="filtersValue.players"
                      :max="rangePlayers.max"
                      :min="rangePlayers.min"
                      hide-details
                      dense
                      thumb-label="always"
                      thumb-size="16"
                    />
                    <v-range-slider
                      v-show="filtersActive.playersRange"
                      v-model="filtersValue.playersRange"
                      :max="rangePlayers.max"
                      :min="rangePlayers.min"
                      hide-details
                      dense
                      thumb-label="always"
                      thumb-size="16"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>

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

    drawer: true,
    mini: true,
    search: "",
    filtersActive: {
      players: false,
      playersRange: false,
    },
    filtersValue: {
      players: 4,
      playersRange: [2, 6],
    },
    sortDesc: false,
    sortBy: "bggWeight",
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
    filtersActive: {
      handler: function (val, oldVal) {
        this.filteredGames =
          val.players || val.playersRange
            ? this.filterPlayers()
            : [...this.games];
      },
      deep: true,
    },
    filtersValue: {
      handler: function (val, oldVal) {
        this.filteredGames =
          this.filtersActive.players || this.filtersActive.playersRange
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
        const [min, max] = this.filtersActive.playersRange
          ? this.filtersValue.playersRange
          : Array(2).fill(this.filtersValue.players);
        return game.players.min <= min && game.players.max >= max;
      });
    },
  },
});
</script>
