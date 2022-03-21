<template>
  <v-container>
    <h1 class="text-h2 text-center">Tapestry scores</h1>

    <TapestryScoresTable
      :civilizations="tapestryCivilizations"
      :plays="tapestryPlays"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TapestryScoresTable from "@/components/TapestryScoresTable.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ScoresTapestry",

  components: {
    TapestryScoresTable,
  },

  computed: {
    ...mapState(["tapestryPlays", "tapestryCivilizations"]),
  },
});
</script>