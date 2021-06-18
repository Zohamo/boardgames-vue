<template>
  <v-footer padless>
    <v-card class="pa-5 flex" flat tile>
      <v-card-text class="text-center">
        {{ new Date().getFullYear() }} — <strong>Boardgames</strong> by
        <a href="https://mathiasmille.fr">Mathias Mille</a> }:§
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppFooter",

  data: () => ({
    publicPath: process.env.BASE_URL,
  }),
});
</script>
