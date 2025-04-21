<template>
  <v-simple-table class="mt-4">
    <template v-slot:default>
      <tbody>
        <tr v-for="play in sortedPlays" :key="play.id">
          <th>{{ play.date | date }}</th>
          <td class="text-uppercase">
            <small>{{
              play.campaignId ? "Campagne #" + play.campaignId : "Aventure"
            }}</small>
          </td>
          <td>{{ play.adventure?.id }}&nbsp;: {{ play.adventure?.name }}</td>
          <td>
            <v-list-item v-for="player in play.players" :key="player.id">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <div class="mr-2" style="width: 55px">
                    <v-chip
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
                  </div>
                  <div>
                    <div class="d-flex align-center">
                      <template v-if="!player.automa">
                        <div class="d-flex align-center">
                          <v-icon class="mr-2"
                            >mdi-account{{
                              player.winner ? "-star" : ""
                            }}</v-icon
                          >
                          <div>
                            {{ player.name || "Inconnu" }}
                          </div>
                          <v-icon
                            v-for="(star, i) in player.stars"
                            :key="i"
                            class="ml-2"
                            >mdi-flare</v-icon
                          >
                        </div>
                      </template>
                      <template v-else>
                        <div class="d-flex align-center">
                          <v-icon class="mr-2"
                            >mdi-robot-{{
                              player.winner ? "happy" : "dead"
                            }}</v-icon
                          >
                          <div>{{ automaName(player.automaLevel) }}</div>
                          <v-icon
                            v-for="(star, i) in player.stars"
                            :key="i"
                            class="ml-2"
                            >mdi-flare</v-icon
                          >
                        </div>
                      </template>
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { welcomeToTheMoonMixin } from "@/mixins/welcomeToTheMoonMixins";
import { WelcomeToTheMoonPlay } from "@/types";

export default Vue.extend({
  name: "WelcomeToTheMoonScoresByDate",
  mixins: [welcomeToTheMoonMixin],
  props: {
    plays: {
      type: Array as PropType<WelcomeToTheMoonPlay[]>,
      required: true,
      default: [],
    },
    mainPlayerId: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    sortedPlays(): WelcomeToTheMoonPlay[] {
      return this.plays.slice(0).reverse();
    },
  },
  methods: {
    automaLevelLitteral(value: number | undefined): string {
      switch (value) {
        case 2:
          return "Alexei";
        case 3:
          return "Margaret";
        case 4:
          return "Franklin";
        case 5:
          return "Sergei";
        case 6:
          return "Stéphanie";
        case 7:
          return "Thomas";
        case 8:
          return "Peggy";
        case 1:
        default:
          return "Katherine";
      }
    },
  },
});
</script>
