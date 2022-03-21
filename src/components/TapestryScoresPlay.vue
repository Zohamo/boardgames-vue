<template>
  <v-card flat color="transparent">
    <v-card-text>
      <time>{{ play.date | date }}</time>
      <span v-if="play.scenario">
        - Scénario {{ play.scenario.id | roman }} : {{ play.scenario.name }}
      </span>
      <v-list-item v-for="player in play.players" :key="player.id">
        <v-list-item-content>
          <v-list-item-title class="d-flex">
            <template v-if="!player.automa">
              {{ player.name || "Inconnu" }}
            </template>
            <template v-else>
              {{ player.automaLevel }}-Automa
              {{ automaLevelLitteral(player.automaLevel) }}
            </template>
            <v-chip
              class="ml-auto"
              :color="
                !player.winner
                  ? ''
                  : player.id === mainPlayerId
                  ? 'green'
                  : 'red'
              "
              :text-color="player.winner ? 'white' : ''"
              >{{ player.score }}</v-chip
            >
          </v-list-item-title>
          <v-list-item-subtitle v-if="player.id !== mainPlayerId">{{
            player.civilization.name
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { TapestryPlay, TapestryPlayer } from "@/types";

export default Vue.extend({
  name: "TapestryScoresPlay",

  props: {
    play: {
      type: Object as PropType<TapestryPlay>,
      required: true,
    },
    mainPlayerId: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    automaLevelLitteral(value: number): string {
      switch (value) {
        case 2:
          return "le Moyen";
        case 3:
          return "le Légèrement Intimidant";
        case 4:
          return "le Quelque Peu Impressionnant";
        case 5:
          return "le Définitivement Incroyable";
        case 6:
          return "le Briseur de Rêves";
        default:
          return "le Sous Performant";
      }
    },
  },
});
</script>