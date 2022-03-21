<template>
  <v-app-bar hide-on-scroll dark dense app>
    <div class="d-flex align-center">
      <v-img
        alt="Meeple"
        class="shrink mr-2"
        contain
        :src="`${appUrl}favicon.svg`"
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
              { title: 'Scythe', page: 'ScoresScythe', slug: 'scythe' },
              { title: 'Tapestry', page: 'ScoresTapestry', slug: 'tapestry' },
            ]"
            :key="item.slug"
            :to="{ name: item.page }"
          >
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y transition="expand-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain v-bind="attrs" v-on="on"> Règles &amp; Aides </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in [
              { title: '7 Wonders', url: 'doc/7-wonders', slug: '7-wonders' },
              {
                title: 'Magic l\'Assemblée',
                url: 'games/magic/rules/abilities',
                slug: 'magic-abilities',
              },
              { title: 'Tapestry', url: 'doc/tapestry', slug: 'tapestry' },
            ]"
            :key="item.slug"
            :href="appUrl + item.url"
          >
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon link :href="author.url"> }:§ </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "AppHeader",

  computed: {
    ...mapState(["appUrl", "author"]),
  },
});
</script>
