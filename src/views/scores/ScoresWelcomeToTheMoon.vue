<template>
  <v-container>
    <h1 class="text-h2 text-center mb-5">Welcome to the moon scores</h1>

    <v-tabs v-model="tab" align-tabs="center">
      <v-tab :value="1">History</v-tab>
      <v-tab :value="2">Adventure</v-tab>
      <v-tab :value="3">Campaign</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <WelcomeToTheMoonScoresByDate :plays="welcomeToTheMoonPlays" />
      </v-tab-item>
      <v-tab-item>
        <WelcomeToTheMoonScoresByAdventure
          :adventures="welcomeToTheMoonAdventures"
          :plays="welcomeToTheMoonPlays"
        />
      </v-tab-item>
      <v-tab-item>
        <WelcomeToTheMoonScoresByCampaign
          :campaigns="welcomeToTheMoonCampaigns"
          :plays="welcomeToTheMoonPlays.filter((play) => !!play.campaignId)"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WelcomeToTheMoonScoresByAdventure from "@/components/WelcomeToTheMoonScoresByAdventure.vue";
import WelcomeToTheMoonScoresByDate from "@/components/WelcomeToTheMoonScoresByDate.vue";
import WelcomeToTheMoonScoresByCampaign from "@/components/WelcomeToTheMoonScoresByCampaign.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ScoresWelcomeToTheMoon",
  data: () => ({
    tab: null,
  }),
  components: {
    WelcomeToTheMoonScoresByAdventure,
    WelcomeToTheMoonScoresByDate,
    WelcomeToTheMoonScoresByCampaign,
  },
  computed: {
    ...mapState([
      "welcomeToTheMoonPlays",
      "welcomeToTheMoonAdventures",
      "welcomeToTheMoonCampaigns",
    ]),
  },
});
</script>
