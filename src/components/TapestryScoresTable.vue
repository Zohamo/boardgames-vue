<template>
  <v-simple-table class="mt-4">
    <template v-slot:default>
      <tbody>
        <tr v-for="civ in sortedCivilizations" :key="civ.slug">
          <th class="text-h6 pa-4">
            {{ civ.name }}
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="civ.notWithAutoma"
                  small
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-cog-off</v-icon
                >
              </template>
              <span>à retirer contre l'Automa</span>
            </v-tooltip>
          </th>
          <td>
            <div class="d-flex">
              <TapestryScoresPlay
                v-for="play in getPlaysByCiv(civ.slug)"
                :key="play.id"
                :play="play"
                :main-player-id="mainPlayerId"
              />
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
import TapestryScoresPlay from "@/components/TapestryScoresPlay.vue";
import { TapestryCivilization, TapestryPlay } from "@/types";

export default Vue.extend({
  name: "TapestryScoresTable",

  components: {
    TapestryScoresPlay,
  },

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
    sortedCivilizations(): TapestryCivilization[] {
      return this.civilizations
        .filter((civ) => !civ.automa)
        .sort(this.sortByName);
    },
  },

  methods: {
    sortByName(a: TapestryCivilization, b: TapestryCivilization): number {
      return a.name.localeCompare(b.name);
    },

    getPlaysByCiv(civSlug: string): TapestryPlay[] {
      return this.plays.filter(
        (play) =>
          play.players.find((player) => player.id === this.mainPlayerId)
            ?.civilization.slug === civSlug
      );
    },
  },
});
</script>