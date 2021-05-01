<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Meeple"
          class="shrink mr-2"
          contain
          src="https://binjoug.prootrecords.com/boardgames/favicon.png"
          width="25"
          transition="scroll-x-transition"
        />
        <h1 class="display-1">Board Games</h1>
      </div>
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
