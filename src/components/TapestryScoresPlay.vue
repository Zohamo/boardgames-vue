<template>
  <v-card flat color="transparent">
    <v-card-text>
      <time>{{ play.date | date }} </time>
      <template v-if="play.scenario">
        <span v-if="play.scenario.campaign"
          >{{ play.scenario.campaign.name }}&nbsp;:
          {{ play.scenario.number | roman }}.
        </span>
        <span v-html="play.scenario.name" />
      </template>
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
              v-text="player.score"
            />
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="player.id !== mainPlayerId"
            v-html="player.civilization?.name"
          />
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { TapestryPlay } from "@/types";

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
    automaLevelLitteral(value: number | undefined): string {
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
        case 1:
        default:
          return "le Sous Performant";
      }
    },
  },
});
</script>
