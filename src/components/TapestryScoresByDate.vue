<template>
  <v-simple-table class="mt-4">
    <template v-slot:default>
      <tbody>
        <tr v-for="play in sortedPlays" :key="play.id">
          <th>{{ play.date | date }}</th>
          <td>
            <template v-if="play.scenario">
              <span v-if="play.scenario.campaign"
                >{{ play.scenario.campaign.name }}&nbsp;:
                {{ play.scenario.number | roman }}.
              </span>
              <span v-html="play.scenario.name" />
            </template>
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
                            <div class="d-flex align-center">
                              <v-list-item-subtitle
                                v-html="player.civilization?.name"
                              />
                              <v-list-item-subtitle
                                v-if="player.capital"
                                class="text-no-wrap"
                              >
                                <v-icon small class="mr-2"
                                  >mdi-city-variant</v-icon
                                >
                                {{ player.capital.id }}-{{
                                  player.capital.name
                                }}
                              </v-list-item-subtitle>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="d-flex align-center">
                          <v-icon class="mr-2"
                            >mdi-robot-{{
                              player.winner ? "happy" : "dead"
                            }}</v-icon
                          >
                          <div>
                            {{ automaName(player.automaLevel) }}
                            <v-list-item-subtitle
                              v-if="player.id !== mainPlayerId"
                              v-html="player.civilization?.name"
                            />
                          </div>
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
import { tapestryMixins } from "@/mixins/tapestryMixins";
import { TapestryCivilization, TapestryPlay } from "@/types";

export default Vue.extend({
  name: "TapestryScoresByDate",
  mixins: [tapestryMixins],
  props: {
    civilizations: {
      type: Array as PropType<TapestryCivilization[]>,
      required: true,
      default: [],
    },
    plays: {
      type: Array as PropType<TapestryPlay[]>,
      required: true,
      default: [],
    },
    mainPlayerId: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    sortedPlays(): TapestryPlay[] {
      return this.plays.slice(0).reverse();
    },
  },
});
</script>
