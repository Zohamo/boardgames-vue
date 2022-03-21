<template>
  <v-container>
    <v-toolbar class="mb-4" plain>
      <h1 class="h2">TAPESTRY</h1>
      <div class="flex-grow-1 d-flex" style="justify-content: space-evenly">
        <v-btn
          v-for="tab in tabs"
          :key="tab.slug"
          :plain="selectedTab !== tab.slug"
          :dark="selectedTab === tab.slug"
          v-html="tab.title"
          :href="`${appUrl}games/tapestry/rules/#${tab.slug}`"
        />
      </div>
    </v-toolbar>

    <iframe
      class="elevation-8"
      :src="`${appUrl}doc/tapestry/${selectedTab}.html`"
      style="width: 100%; height: calc(100% - 80px)"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "rules-tapestry",

  data: () => ({
    selectedTab: "",
    tabs: [
      {
        title: "FAQ",
        slug: "faq",
      },
    ],
  }),

  computed: {
    ...mapState(["appUrl"]),
  },

  watch: {
    "$route.hash": {
      handler: function (hash) {
        this.selectedTab = hash?.substring(1) || "faq";
      },
      immediate: true,
    },
  },
});
</script>