<template>
  <v-container>
    <div class="d-flex justify-center align-center">
      <img
        :src="`${appUrl}img/mtg/MTG-logo.svg`"
        alt="Magic The Gathering"
        style="max-width: 300px"
        class="mx-2"
      />
      <h1 class="text-h2 mx-2">Capacités</h1>
    </div>

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

    <v-list-group
      v-for="ability in abilities"
      :key="ability.ref"
      prepend-icon="mdi-star-four-points-outline"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title
            ><strong>{{ ability.nameFr }}</strong> /
            {{ ability.nameEn }}</v-list-item-title
          >
          <v-list-item-subtitle
            class="text-wrap"
            v-html="ability.description"
          />
        </v-list-item-content>
      </template>

      <v-list-item v-for="detail in ability.details" :key="detail.ref">
        <v-list-item-icon>
          <v-chip>{{ detail.ref }}</v-chip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-wrap" v-html="detail.textFr" />
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { MtgAbility } from "@/types";

export default Vue.extend({
  name: "mtg-abilities",

  data: () => ({
    abilities: [] as MtgAbility[],
    search: "",
  }),

  computed: {
    ...mapState(["appUrl", "mtgAbilities"]),
  },

  async created() {
    this.mtgAbilities.map((ability: MtgAbility) => {
      ability.description = this.insertImages(ability.description);
      if (ability.details && ability.details.length) {
        ability.details.map((detail) => {
          detail.textFr = this.insertImages(detail.textFr);
          return detail;
        });
      }
      return ability;
    });
    this.abilities = this.mtgAbilities;
  },

  watch: {
    search(val: string): void {
      this.abilities = !val
        ? this.mtgAbilities
        : this.mtgAbilities.filter(
            (ability: MtgAbility) =>
              this.normalize(ability.nameFr).indexOf(this.normalize(val)) !==
                -1 ||
              this.normalize(ability.nameEn).indexOf(this.normalize(val)) !== -1
          );
    },
  },

  methods: {
    /**
     * Replace symbols tags by <img>.
     *
     * @param {string} text
     * @return {string}
     */
    insertImages(text: string): string {
      let found = [...text.matchAll(/\{[A-Z0-9]+\}/g)];
      if (!found) {
        return text;
      }
      found.forEach((item) => {
        const img = item[0].slice(1, -1);
        text = text.replaceAll(
          item[0],
          `<img src="${this.appUrl}img/mtg/${img}.png" alt="${img}" />`
        );
      });
      return text;
    },

    /**
     * Normalize a string for search comparison.
     *
     * @param {string} str
     * @return {string}
     */
    normalize(str: string): string {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
  },
});
</script>
