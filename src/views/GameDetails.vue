<template>
  <v-container>
    <v-sheet class="d-flex flex-column align-center pt-8">
      <v-card class="px-8 py-4">
        <div class="d-flex align-center">
          <img :src="imgUrl" alt="box" class="my-auto" />
          <div class="ml-8 d-flex flex-column">
            <h2 class="d-flex flex-column display-1 text-no-wrap my-auto">
              <small v-if="game.preTitle">{{ game.preTitle }}</small>
              {{ game.title }}
              <small v-if="game.postTitle">{{ game.postTitle }}</small>
            </h2>
            <p class="mt-4">{{ game.year }}</p>
          </div>
        </div>

        <v-list class="text-no-wrap">
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-shape</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ game.theme }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon small>mdi-account-switch</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-no-wrap">
              <template
                v-if="
                  !game.players.max || game.players.min === game.players.max
                "
              >
                {{ game.players.min }} joueurs
              </template>
              <template v-else>
                {{ game.players.min }} à {{ game.players.max }} joueurs
              </template>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon small>mdi-weight</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-no-wrap">
              {{ game.bggWeight }} / 5
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon small>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <template
                  v-if="
                    !game.duration.max ||
                    game.duration.min === game.duration.max
                  "
                >
                  {{ game.duration.min }} min.
                </template>
                <template v-else>
                  {{ game.duration.min }} à {{ game.duration.max }} min.
                </template>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon small>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ game.mechanisms }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import GameService from "@/services/GameService";
import { Game } from "@/types";

export default Vue.extend({
  name: "GameDetail",

  data: () => ({
    loading: true,
    game: {} as Game,
  }),

  computed: {
    imgUrl() {
      const slug = this.game.slug || "";
      return "https://mathiasmille.fr/boardgames/img/" + slug + ".jpg";
    },
  },

  created() {
    GameService.getGame(+this.$route.params.id).then((game) => {
      this.game = game;
      this.loading = false;
    });
  },
});
</script>
