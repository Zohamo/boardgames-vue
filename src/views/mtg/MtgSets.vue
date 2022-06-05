<template>
  <v-container>
    <div class="d-flex justify-center align-center pb-4">
      <img
        :src="`${appUrl}img/mtg/MTG-logo.svg`"
        alt="Magic The Gathering"
        style="max-width: 300px"
        class="mx-2"
      />
      <h1 class="text-h2 mx-2">Éditions</h1>
    </div>

    <p class="text-right">
      <a href="https://magic.wizards.com/fr/products/card-set-archive"
        >magic.wizards.com/fr/products/card-set-archive</a
      >
    </p>

    <v-text-field
      v-model="search"
      clearable
      fixed
      flat
      solo
      filled
      hide-details
      autofocus
      prepend-inner-icon="mdi-magnify"
      label="Rechercher"
      class="my-8"
    />

    <v-data-table
      dense
      :headers="headers"
      :items="mtgSets"
      item-key="code"
      sort-by="releaseDate"
      :sort-desc="true"
      :items-per-page="100"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center">
          <v-img
            v-if="!isImgError(item.code)"
            contain
            :src="`${appUrl}img/mtg/sets/${item.code}_SetIcon.png`"
            max-height="30"
            max-width="50"
            @error="imgErrors.push(item.code)"
            alt="icon"
          />
          <span v-else style="width: 50px" />
          <span class="ml-4">{{ item.name }}</span>
        </div>
      </template>
      <template v-slot:item.releaseDate="{ item }">
        <span>{{ new Date(item.releaseDate).toLocaleDateString() }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "mtg-sets",

  data: () => ({
    loading: true,
    headers: [
      { text: "Sortie", value: "releaseDate" },
      { text: "Nom", value: "name" },
      { text: "Bloc", value: "block" },
      { text: "Code", value: "code" },
      { text: "Type", value: "type" },
    ],
    search: "",
    imgErrors: [] as string[],
  }),

  async beforeMount() {
    this.$store.dispatch("getMtgSets");
  },

  computed: {
    ...mapState(["appUrl", "mtgSets"]),
  },

  watch: {},

  methods: {
    ...mapActions(["getGames"]),

    isImgError(code: string): boolean {
      return this.imgErrors.includes(code);
    },
  },
});
</script>
