<template>
  <v-container fluid>
    <v-data-iterator
      :items="games"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar elevation="0" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo
            filled
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
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
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
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
    itemsPerPage: -1,
    search: "" as string,
    filter: {},
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
  }),

  created() {
    GameService.getGames().then((games) => {
      this.games = games;
      this.loading = false;
    });
  },
});
</script>
