<template>
  <div>
    <div v-for="campaign in campaigns" :key="campaign.id" class="my-4">
      <h3 class="mb-4">
        {{ campaign.id }}. {{ campaign.name }}
        <em>({{ plays.length }} plays)</em>
      </h3>
      <div class="d-flex">
        <v-card
          v-for="player in getPlayers(plays)"
          :key="player.id"
          class="mx-3"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-3">
                {{ player.automa ? "ASTRA" : player.name }}
              </v-list-item-title>
              <div class="d-flex">
                <v-list-item-subtitle>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon class="mr-2">mdi-flare</v-icon
                        >{{ getPlayerStats(player.id, plays).stars }}</span
                      >
                    </template>
                    <span>Stars total</span>
                  </v-tooltip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon class="mr-2">mdi-trophy</v-icon
                        >{{ getPlayerStats(player.id, plays).victories }}</span
                      >
                    </template>
                    <span>Victories total</span>
                  </v-tooltip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon class="mr-2">mdi-radius</v-icon
                        >{{
                          Math.round(
                            getPlayerStats(player.id, plays).scores.reduce(
                              (a, b) => a + b
                            ) / getPlayerStats(player.id, plays).scores.length
                          )
                        }}</span
                      >
                    </template>
                    <span>Average score</span>
                  </v-tooltip>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="player.automa">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        <v-icon class="mr-2">mdi-brain</v-icon
                        >{{
                          (
                            getPlayerStats(
                              player.id,
                              plays
                            ).automaLevels.reduce((a, b) => a + b) /
                            getPlayerStats(player.id, plays).automaLevels.length
                          ).toFixed(2)
                        }}</span
                      >
                    </template>
                    <span>Average ASTRA level</span>
                  </v-tooltip>
                </v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <v-simple-table class="mt-4">
        <template v-slot:default>
          <tbody>
            <tr v-for="play in sortedPlays" :key="play.id">
              <th>{{ play.date | date }}</th>
              <td class="text--secondary">
                <p v-if="play.campaignChapter" class="mb-0">
                  Chapitre #{{ play.campaignChapter }}
                </p>
                <p v-if="play.campaignSave" class="mb-0">
                  Sauvegarde #{{ play.campaignSave }}
                </p>
              </td>
              <td class="text-h6">
                {{ play.adventure?.id }}&nbsp;: {{ play.adventure?.name }}
              </td>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { welcomeToTheMoonMixins } from "@/mixins/welcomeToTheMoonMixins";
import {
  WelcomeToTheMoonCampaign,
  WelcomeToTheMoonPlay,
  WelcomeToTheMoonPlayer,
} from "@/types";

export default Vue.extend({
  name: "WelcomeToTheMoonScoresByCampaign",
  mixins: [welcomeToTheMoonMixins],
  props: {
    campaigns: {
      type: Array as PropType<WelcomeToTheMoonCampaign[]>,
      required: true,
      default: [],
    },
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
    getPlayers(plays: WelcomeToTheMoonPlay[]): WelcomeToTheMoonPlayer[] {
      const players: WelcomeToTheMoonPlayer[] = [];
      plays.forEach((play) => {
        play.players.forEach((playerFromPlay: WelcomeToTheMoonPlayer) => {
          if (!players.find((player) => player.id === playerFromPlay.id)) {
            players.push(playerFromPlay);
          }
        });
      });
      return players;
    },
    getPlayerStats(
      playerId: number | undefined,
      plays: WelcomeToTheMoonPlay[]
    ): {
      stars: number;
      victories: number;
      scores: number[];
      automaLevels: number[];
    } {
      const stats = { stars: 0, victories: 0, scores: [0], automaLevels: [0] };
      stats.scores = [];
      stats.automaLevels = [];
      plays.forEach((play) => {
        const player = play.players.find(
          (playerFromPlay: WelcomeToTheMoonPlayer) =>
            playerFromPlay.id === playerId
        );
        if (!player) {
          return;
        }
        if (player.stars) {
          stats.stars += player.stars;
        }
        if (player.winner) {
          stats.victories++;
        }
        if (player.score) {
          stats.scores.push(player.score);
        }
        if (player.automa && player.automaLevel) {
          stats.automaLevels.push(player.automaLevel);
        }
      });
      return stats;
    },
  },
});
</script>
