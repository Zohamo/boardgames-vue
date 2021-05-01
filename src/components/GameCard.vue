<template>
  <div class="game">
    <h3>
      <template v-if="game.preTitle"
        ><small>{{ game.preTitle }}</small
        ><br /></template
      >{{ game.title
      }}<template v-if="game.postTitle"
        ><br /><small>{{ game.postTitle }}</small></template
      >
    </h3>
    <figure>
      <img
        :src="'https://mathiasmille.fr/boardgames/img/' + game.slug + '.jpg'"
      />
    </figure>

    <div class="game-details">
      <p>Thème&nbsp;: {{ game.theme }}</p>
      <p v-if="!game.players.max">{{ game.players.min }} joueurs</p>
      <p v-else>{{ game.players.min }} à {{ game.players.max }} joueurs</p>

      <p>Difficulté&nbsp;: {{ game.bggWeight }} / 5</p>

      <p v-if="!game.duration.max">{{ game.duration.min }} min.</p>
      <p v-else>{{ game.duration.min }} à {{ game.duration.max }} min.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { Game } from "@/types";

export default Vue.extend({
  name: "GameCard",

  props: {
    game: {
      type: Object as PropType<Game>,
      required: true,
    },
  },
});
</script>

<style scoped>
.game {
  margin: 0 1rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.game-details p {
  margin-bottom: 0.25rem;
}
</style>
