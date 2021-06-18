<template>
  <v-footer dark padless elevation="4">
    <v-card class="pa-2 text--white flex text-center" flat tile>
      <v-card-text>
        {{ new Date().getFullYear() }} — <a :href="appUrl">Boardgames</a> v{{
          appVersion
        }}
        by <a :href="author.url" target="_blank">{{ author.name }}</a>
      </v-card-text>
      <v-card-text>
        made with <a :href="vueUrl" target="_blank">Vue.js</a> v{{ vueVersion }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "AppFooter",

  computed: {
    ...mapState(["appUrl", "author", "appVersion", "vueUrl", "vueVersion"]),
  },
});
</script>

<style scoped>
a {
  color: inherit !important;
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
