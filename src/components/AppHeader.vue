<template>
  <v-app-bar hide-on-scroll dark dense app>
    <div class="d-flex align-center">
      <v-img
        alt="Meeple"
        class="shrink mr-2"
        contain
        :src="`${publicPath}favicon.svg`"
        width="25"
        transition="scroll-x-transition"
      />

      <v-btn plain :to="{ name: 'Home' }">
        <v-toolbar-title>Jeux de société</v-toolbar-title>
      </v-btn>

      <v-menu offset-y transition="expand-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain v-bind="attrs" v-on="on"> Scores </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in [
              { title: 'Scythe', page: 'ScytheScores', slug: 'scythe' },
            ]"
            :key="item.slug"
            :to="{ name: item.page }"
          >
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon link href="https://mathiasmille.fr"> }:§ </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppHeader",

  data: () => ({
    publicPath: process.env.BASE_URL,
  }),
});
</script>
