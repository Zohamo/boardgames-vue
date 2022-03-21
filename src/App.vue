<template>
  <v-app style="min-height: 100vh">
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

<style>
iframe {
  border: none;
}
.v-main__wrap {
  display: flex;
  flex-direction: column;
}
.v-main__wrap > .container {
  flex-grow: 1;
}
</style>
