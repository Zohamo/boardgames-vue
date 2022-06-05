<template>
  <v-container fluid>
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
              <v-icon v-text="sortDesc ? 'mdi-arrow-down' : 'mdi-arrow-up'" />
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
                  :min="playersRange.min"
                  :max="playersRange.max"
                  hide-details
                  dense
                  thumb-label="always"
                  thumb-size="16"
                />
                <v-range-slider
                  v-show="filtersActive.playersRange"
                  v-model="filtersValue.playersRange"
                  :min="playersRange.min"
                  :max="playersRange.max"
                  hide-details
                  dense
                  thumb-label="always"
                  thumb-size="16"
                />
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="justify-space-between">
              <v-btn-toggle v-model="filtersActive.duration">
                <v-btn
                  small
                  depressed
                  outlined
                  v-text="'Durée'"
                  color="primary"
                  :value="true"
                />
              </v-btn-toggle>
              <v-btn-toggle v-model="filtersActive.durationRange">
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
                  v-show="!filtersActive.durationRange"
                  v-model="filtersValue.duration"
                  :min="durationRange.min"
                  :max="durationRange.max"
                  hide-details
                  dense
                  thumb-label="always"
                  thumb-size="16"
                  step="10"
                />
                <v-range-slider
                  v-show="filtersActive.durationRange"
                  v-model="filtersValue.durationRange"
                  :min="durationRange.min"
                  :max="durationRange.max"
                  hide-details
                  dense
                  thumb-label="always"
                  thumb-size="16"
                  step="10"
                />
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="justify-space-between">
              <v-btn-toggle v-model="filtersActive.theme">
                <v-btn
                  small
                  depressed
                  outlined
                  v-text="'Thème'"
                  color="primary"
                  :value="true"
                />
              </v-btn-toggle>
            </v-list-item>

            <v-list-item dense class="pl-1">
              <v-select
                dense
                v-model="filtersValue.theme"
                flat
                solo
                filled
                hide-details
                :items="themes"
              />
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

      <v-col>
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
              <v-col v-for="game in items" :key="game.id">
                <GameCard :game="game" />
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import GameCard from "@/components/GameCard.vue";
import { Game } from "@/types";

export default Vue.extend({
  name: "GamesList",

  components: {
    GameCard,
  },

  data: () => ({
    loading: true,
    filteredGames: [] as Game[],
    itemsPerPage: -1,

    drawer: true,
    mini: true,
    search: "",

    playersRange: {
      min: 1,
      max: 6,
    },
    durationRange: {
      min: 30,
      max: 120,
    },
    themes: [] as string[],
    filtersActive: {
      players: false,
      playersRange: false,
      duration: false,
      durationRange: false,
      theme: false,
    },
    filtersValue: {
      players: 4,
      playersRange: [2, 6],
      duration: 30,
      durationRange: [30, 60],
      theme: "",
    },

    sortDesc: true,
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
        label: "Durée max.",
        key: "duration.max",
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
  }),

  async beforeMount() {
    if (this.games.length) {
      this.init();
    } else {
      this.$store.dispatch("getGames").then(() => this.init());
    }
  },

  computed: {
    ...mapState(["games"]),
  },

  watch: {
    filtersActive: {
      handler: function () {
        this.applyFilters();
      },
      deep: true,
    },
    filtersValue: {
      handler: function () {
        this.applyFilters();
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions(["getGames"]),

    init(): void {
      this.filteredGames = [...this.games];
      this.setDefaultValues();
      this.loading = false;
    },

    setDefaultValues(): void {
      this.filteredGames.forEach((game) => {
        if (!game.players.max) {
          game.players.max = game.players.min;
        }
        if (game.players.max > this.playersRange.max) {
          this.playersRange.max = game.players.max;
        }
        if (!game.duration.max) {
          game.duration.max = game.duration.min;
        }
        if (game.duration.min < this.durationRange.min) {
          this.durationRange.min = game.duration.min;
        }
        if (game.duration.max > this.durationRange.max) {
          this.durationRange.max = game.duration.max;
        }
        if (!this.themes.includes(game.theme)) {
          this.themes.push(game.theme);
        }
      });
      this.themes.sort();
      this.filtersValue.theme = this.themes[0];
    },

    applyFilters(): void {
      this.filteredGames = this.games.filter(
        (game: Game) =>
          this.filterGameByPlayers(game) &&
          this.filterGameByDuration(game) &&
          this.filterGameByTheme(game)
      );
    },

    filterGameByPlayers(game: Game): boolean {
      if (!this.filtersActive.players) {
        return true;
      }
      const [min, max] = this.filtersActive.playersRange
        ? this.filtersValue.playersRange
        : Array(2).fill(this.filtersValue.players);
      return game.players.min <= min && game.players.max >= max;
    },

    filterGameByDuration(game: Game): boolean {
      if (!this.filtersActive.duration) {
        return true;
      }
      const [min, max] = this.filtersActive.durationRange
        ? this.filtersValue.durationRange
        : Array(2).fill(this.filtersValue.duration);
      return game.duration.min <= min && game.duration.max <= max;
    },

    filterGameByTheme(game: Game): boolean {
      if (!this.filtersActive.theme) {
        return true;
      }
      return game.theme === this.filtersValue.theme;
    },
  },
});
</script>
