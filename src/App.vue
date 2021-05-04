<template>
  <v-app>
    <v-app-bar hide-on-scroll dark dense app>
      <div class="d-flex align-center">
        <v-img
          alt="Meeple"
          class="shrink mr-2"
          contain
          src="favicon.svg"
          width="25"
          transition="scroll-x-transition"
        />
        <v-btn plain :to="{ name: 'Home' }">
          <v-toolbar-title>Jeux de société</v-toolbar-title>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon link href="https://mathiasmille.fr"> }:§ </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
