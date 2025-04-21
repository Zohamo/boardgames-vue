<template>
  <div>
    <v-card flat v-for="campaign in campaigns" :key="campaign.slug">
      <v-card-title class="text-h3 mt-4 mb-0 pb-0">{{
        campaign.name
      }}</v-card-title>
      <v-card-title class="text-subtitle font-italic pt-0">
        {{ campaign.expansion?.name }}
      </v-card-title>
      <div
        v-for="scenario in scenarios.filter(
          (scenario) => scenario.campaign?.slug == campaign.slug
        )"
        :key="scenario.id"
        class="my-4"
      >
        <h3>
          Scénario {{ scenario.number | roman }}&nbsp;: {{ scenario.name }}
        </h3>
        <p
          v-if="
            !plays.filter((play) => play.scenario?.id == scenario.id).length
          "
          class="text--secondary"
        >
          Aucune partie
        </p>
        <div v-else class="d-flex">
          <v-card
            v-for="play in plays.filter(
              (play) => play.scenario?.id == scenario.id
            )"
            :key="play.id"
            flat
            color="transparent"
          >
            <v-card-text>
              <time>{{ play.date | date }} </time>
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
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { tapestryMixins } from "@/mixins/tapestryMixins";
import {
  TapestryCampaign,
  TapestryCivilization,
  TapestryPlay,
  TapestryScenario,
} from "@/types";

export default Vue.extend({
  name: "TapestryScoresByScenario",
  mixins: [tapestryMixins],
  props: {
    civilizations: {
      type: Array as PropType<TapestryCivilization[]>,
      required: true,
      default: [],
    },
    campaigns: {
      type: Array as PropType<TapestryCampaign[]>,
      required: true,
      default: [],
    },
    scenarios: {
      type: Array as PropType<TapestryScenario[]>,
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
});
</script>
