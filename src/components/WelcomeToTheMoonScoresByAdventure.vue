<template>
  <v-simple-table class="mt-4">
    <template v-slot:default>
      <tbody>
        <tr v-for="adventure in adventures" :key="adventure.id">
          <th class="text-h6 pa-4">
            Aventure {{ adventure.id }}&nbsp;: {{ adventure.name }}
          </th>
          <td>
            <div class="d-flex">
              <v-card
                v-for="play in plays.filter(
                  (play) => play.adventureId === adventure.id
                )"
                :key="play.id"
                flat
                color="transparent"
              >
                <v-card-text>
                  <time>{{ play.date | date }} </time>
                  <small class="text-uppercase ml-2">{{
                    play.campaignId
                      ? "Campagne #" + play.campaignId
                      : "Aventure"
                  }}</small>
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
                              <v-icon v-bind="attrs" v-on="on" class="mr-2"
                                >mdi-account{{
                                  player.winner ? "-star" : ""
                                }}</v-icon
                              >
                              <div>
                                {{ player.name || "Inconnu" }}
                              </div>
                            </template>
                            <template v-else>
                              <v-icon v-bind="attrs" v-on="on" class="mr-2"
                                >mdi-robot-{{
                                  player.winner ? "happy" : "dead"
                                }}</v-icon
                              >
                              <div>{{ automaName(player.automaLevel) }}</div>
                            </template>
                          </div>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { welcomeToTheMoonMixins } from "@/mixins/welcomeToTheMoonMixins";
import { WelcomeToTheMoonAdventure, WelcomeToTheMoonPlay } from "@/types";

export default Vue.extend({
  name: "WelcomeToTheMoonScoresByAdventure",
  mixins: [welcomeToTheMoonMixins],
  props: {
    adventures: {
      type: Array as PropType<WelcomeToTheMoonAdventure[]>,
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
});
</script>
