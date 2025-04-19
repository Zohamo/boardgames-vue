<template>
  <v-container>
    <h1 class="text-h2 text-center mb-5">Tapestry scores</h1>

    <v-tabs v-model="tab" align-tabs="center">
      <v-tab :value="1">History</v-tab>
      <v-tab :value="2">Civilizations</v-tab>
      <v-tab :value="3">Scenarios</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <TapestryScoresByDate
          :civilizations="tapestryCivilizations"
          :plays="tapestryPlays"
        />
      </v-tab-item>
      <v-tab-item>
        <TapestryScoresByCivilization
          :civilizations="tapestryCivilizations"
          :plays="tapestryPlays"
        />
      </v-tab-item>
      <v-tab-item>
        <TapestryScoresByScenario
          :civilizations="tapestryCivilizations"
          :plays="tapestryPlays"
          :campaigns="tapestryCampaigns"
          :scenarios="tapestryScenarios"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TapestryScoresByCivilization from "@/components/TapestryScoresByCivilization.vue";
import TapestryScoresByDate from "@/components/TapestryScoresByDate.vue";
import TapestryScoresByScenario from "@/components/TapestryScoresByScenario.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ScoresTapestry",
  data: () => ({
    tab: null,
  }),
  components: {
    TapestryScoresByCivilization,
    TapestryScoresByDate,
    TapestryScoresByScenario,
  },
  computed: {
    ...mapState([
      "tapestryPlays",
      "tapestryCivilizations",
      "tapestryCampaigns",
      "tapestryScenarios",
    ]),
  },
});
</script>
