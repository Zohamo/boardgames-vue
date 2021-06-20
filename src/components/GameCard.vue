<template>
  <router-link
    :to="{ name: 'GameDetails', params: { slug: game.slug } }"
    style="text-decoration: none"
  >
    <v-card class="game" elevation="0">
      <img :src="imgUrl" alt="box" class="my-auto" />

      <v-card-title class="flex-column text-center text-no-wrap">
        <small v-show="game.preTitle">{{ game.preTitle }}</small>
        {{ game.title }}
        <small v-show="game.postTitle">{{ game.postTitle }}</small>
      </v-card-title>

      <v-list dense class="text-no-wrap">
        <v-list-item>
          <v-list-item-icon class="my-0 mr-2">
            <v-icon small>mdi-shape</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ game.theme }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon class="my-0 mr-2">
            <v-icon small>mdi-account-switch</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-no-wrap">
            <template
              v-if="!game.players.max || game.players.min === game.players.max"
            >
              {{ game.players.min }} joueurs
            </template>
            <template v-else>
              {{ game.players.min }} à {{ game.players.max }} joueurs
            </template>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon class="my-0 mr-2">
            <v-icon small>mdi-weight</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-no-wrap">
            {{ game.bggWeight }} / 5
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon class="my-0 mr-2">
            <v-icon small>mdi-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <template
                v-if="
                  !game.duration.max || game.duration.min === game.duration.max
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
      </v-list>
    </v-card>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { mapState } from "vuex";
import { Game } from "@/types";

export default Vue.extend({
  name: "GameCard",

  props: {
    game: {
      type: Object as PropType<Game>,
      required: true,
    },
  },

  computed: {
    ...mapState(["appUrl"]),

    imgUrl(): string {
      return this.game?.slug ? `${this.appUrl}img/${this.game.slug}.jpg` : "";
    },
  },
});
</script>

<style scoped>
.game {
  margin: 0 1rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 24px;
}
</style>
