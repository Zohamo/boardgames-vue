<template>
  <v-container fluid>
    <v-row class="pt-8">
      <v-col cols="12" class="col-md-5 order-0 order-md-1">
        <v-card v-if="game" class="px-8 py-4">
          <v-row class="align-center">
            <v-col class="flex-grow-0 mx-auto">
              <img :src="imgUrl" alt="box" class="my-auto" />
            </v-col>
            <v-col class="ml-8 d-flex flex-column">
              <h2 class="d-flex flex-column display-1 my-auto">
                <small v-if="game.preTitle">{{ game.preTitle }}</small>
                {{ game.title }}
                <small v-if="game.postTitle">{{ game.postTitle }}</small>
              </h2>
              <p class="mt-4">{{ game.year }}</p>
            </v-col>
          </v-row>

          <v-list class="text-no-wrap">
            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-shape</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>Thème</v-list-item-subtitle>
                <v-list-item-title v-text="game.theme" />
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="game.players">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-account-switch</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>Nombre de joueurs</v-list-item-subtitle>
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
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-weight</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>Difficulté</v-list-item-subtitle>
                <v-list-item-title>{{ game.bggWeight }} / 5</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="game.duration">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-clock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>Durée</v-list-item-subtitle>
                <v-list-item-title
                  v-if="
                    !game.duration.max ||
                    game.duration.min === game.duration.max
                  "
                  >{{ game.duration.min }} min.</v-list-item-title
                >
                <v-list-item-title v-else
                  >{{ game.duration.min }} à
                  {{ game.duration.max }} min.</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>Mécanismes</v-list-item-subtitle>
                <v-list-item-title>{{ game.mechanisms }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" class="col-md-7 order-1 order-md-0">
        <v-carousel
          cycle
          height="auto"
          hide-delimiter-background
          show-arrows-on-hover
          :show-arrows="pictures.length > 1"
          :hide-delimiters="pictures.length < 2"
        >
          <v-carousel-item
            v-for="(picture, i) in pictures"
            :key="i"
            :src="picture.src"
          ></v-carousel-item>
        </v-carousel>

        <v-btn dark class="my-8" :to="{ name: 'GamesList' }">
          <v-icon>mdi-chevron-left</v-icon>
          retour à la liste des jeux
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Game, Picture } from "@/types";

export default Vue.extend({
  name: "GameDetail",

  data: () => ({
    loading: true,
    game: {} as Game,
    pictures: [] as Picture[],
  }),

  computed: {
    ...mapState(["appUrl", "games"]),

    imgUrl(): string {
      return this.game?.slug ? `${this.appUrl}img/${this.game.slug}.jpg` : "";
    },
  },

  async beforeMount() {
    if (this.games.length) {
      this.init();
    } else {
      this.$store.dispatch("getGames").then(() => this.init());
    }
  },

  methods: {
    init(): void {
      this.game = this.games.find(
        (game: Game) => game.slug === this.$route.params.slug
      );
      this.loading = false;
      this.pictures = [
        {
          src: `${this.appUrl}img/${this.game.slug}_preview.jpg`,
          alt: "game preview",
        },
      ];
    },
  },
});
</script>
