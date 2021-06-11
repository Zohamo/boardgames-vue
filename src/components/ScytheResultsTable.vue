<template>
  <table class="text-center">
    <thead>
      <tr>
        <th>Human \ Automa</th>
        <th v-for="(faction, i) in factions" :key="i">
          {{ faction.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(factionHuman, i) in factions" :key="i">
        <th>{{ factionHuman.name }}</th>
        <td
          v-for="(factionAutoma, j) in factions"
          :key="j"
          :class="{
            'bg-red':
              results[factionAutoma.slug] &&
              results[factionAutoma.slug][factionHuman.slug] &&
              !results[factionAutoma.slug][factionHuman.slug].human.winner,
          }"
        >
          <template v-if="i !== j">
            <template
              v-if="
                results[factionAutoma.slug] &&
                results[factionAutoma.slug][factionHuman.slug]
              "
            >
              {{ results[factionAutoma.slug][factionHuman.slug].human.score }}
              \
              {{ results[factionAutoma.slug][factionHuman.slug].automa.score }}
            </template>
            <template v-else> - </template>
          </template>
          <template v-else> x </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { ScytheFaction } from "@/types";

export default Vue.extend({
  name: "scythe-results-table",
  props: {
    factions: {
      type: Array as PropType<ScytheFaction[]>,
      required: true,
    },
    results: {
      type: Array as PropType<{ [key: string]: any }>,
      required: true,
    },
  },
});
</script>

<style scoped>
table {
  margin: 0 auto;
}
th,
td {
  padding: 0.5rem 0.75rem;
}
td.disabled {
  background-color: #dadada;
}
.bg-red {
  background-color: #ffb9b9;
}
</style>
