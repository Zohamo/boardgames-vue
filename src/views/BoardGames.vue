<template>
  <v-container fluid>
    <v-data-iterator
      :items="games"
      :items-per-page="itemsPerPage"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="game in items" :key="game.id">
            <GameCard
              :game="game"
              :game-details="gameDetails"
              :filtered-keys="filteredKeys"
              :sort-by="sortBy"
            />
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
    games: [] as Game[],
    itemsPerPage: -1,
    search: "" as string,
    filter: {},
    sortDesc: false as boolean,
    sortBy: "bggWeight" as string,
    keys: ["Title", "BggWeight", "Duration"] as string[],
    gameDetails: [
      {
        name: "Joueurs",
        icon: "mdi-account-switch",
        text: "getPlayers",
      },
    ],
  }),

  created() {
    GameService.getGames().then((games) => {
      this.games = games;
    });
  },

  computed: {
    filteredKeys() {
      return this.keys.filter((key: string) => key !== "Name");
    },
  },
});
</script>
