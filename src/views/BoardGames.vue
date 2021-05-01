<template>
  <div class="games">
    <GameCard v-for="game in games" :key="game.id" :game="game" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GameCard from "@/components/GameCard.vue";
import GameService from "@/services/GameService";
import { Game } from "@/types";

export default Vue.extend({
  name: "BoardGames",

  components: {
    GameCard,
  },

  data: () => ({
    games: [] as Game[],
  }),

  created() {
    GameService.getGames().then((games) => {
      this.games = games;
    });
  },
});
</script>

<style scoped>
.games {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
