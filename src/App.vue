<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
      <app-footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default Vue.extend({
  name: "App",

  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
