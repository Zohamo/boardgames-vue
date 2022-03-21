<template>
  <v-container fluid>
    <v-toolbar class="mb-4" plain>
      <img
        :src="`${appUrl}doc/7-wonders/img/logo-7-wonders_sm.png`"
        style="max-height: 100%"
        alt="7 Wonders"
      />
      <div class="flex-grow-1 d-flex" style="justify-content: space-evenly">
        <v-btn
          v-for="tab in tabs"
          :key="tab.slug"
          :plain="selectedTab !== tab.slug"
          :dark="selectedTab === tab.slug"
          v-html="tab.title"
          :href="`${appUrl}games/7-wonders/rules/#${tab.slug}`"
        />
      </div>
    </v-toolbar>

    <v-card v-if="selectedTab === 'pdf'">
      <v-list>
        <v-list-item
          v-for="file in docs"
          :key="file"
          :href="`${appUrl}doc/7-wonders/${file}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="file" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <iframe
      v-else
      class="elevation-8"
      :src="`${appUrl}doc/7-wonders/${selectedTab}.html`"
      style="width: 100%; height: calc(100% - 80px)"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "rules-seven-wonders",

  data: () => ({
    selectedTab: "",
    tabs: [
      {
        title: "Règles rapides",
        slug: "quick-rules",
      },
      {
        title: "Merveilles",
        slug: "wonders",
      },
      {
        title: "Symboles",
        slug: "symbols",
      },
      {
        title: "FAQ",
        slug: "faq",
      },
      {
        title: "PDF",
        slug: "pdf",
      },
    ],
    docs: ["wonder-pack.pdf", "leaders.pdf", "cities.pdf", "armada.pdf"],
  }),

  computed: {
    ...mapState(["appUrl"]),
  },

  watch: {
    "$route.hash": {
      handler: function (hash) {
        this.selectedTab = hash?.substring(1) || "quick-rules";
      },
      immediate: true,
    },
  },
});
</script>