import GameDetails from "@/views/GameDetails.vue";
import GamesList from "@/views/GamesList.vue";
import ScoresScythe from "@/views/scores/ScoresScythe.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: GamesList,
  },
  {
    path: "/games",
    name: "GamesList",
    component: GamesList,
  },
  {
    path: "/games/:slug",
    name: "GameDetails",
    component: GameDetails,
    props: {
      type: String,
      required: true,
    },
  },
  {
    path: "/games/scythe/scores",
    name: "ScoresScythe",
    component: ScoresScythe,
    props: {
      type: String,
      required: true,
    },
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
