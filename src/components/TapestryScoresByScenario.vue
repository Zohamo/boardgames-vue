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
        v-for="scenario in sortedScenarios(campaign.slug)"
        :key="scenario.id"
      >
        <h3>
          Scénario {{ scenario.number | roman }}&nbsp;: {{ scenario.name }}
        </h3>
        <div class="d-flex">
          <v-card
            v-for="play in sortedPlays(scenario.id)"
            :key="play.id"
            flat
            color="transparent"
          >
            <v-card-text>
              <time>{{ play.date | date }} </time>
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
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import {
  TapestryCampaign,
  TapestryCivilization,
  TapestryPlay,
  TapestryScenario,
} from "@/types";

export default Vue.extend({
  name: "TapestryScoresByScenario",
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
  computed: {},
  methods: {
    sortedScenarios(campaignSlug: string): TapestryScenario[] {
      return this.scenarios.filter(
        (scenario: TapestryScenario) => scenario.campaign?.slug == campaignSlug
      );
    },
    sortedPlays(scenarioId: number | undefined): TapestryPlay[] {
      return this.plays.filter(
        (play: TapestryPlay) => play.scenario?.id == scenarioId
      );
    },
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
