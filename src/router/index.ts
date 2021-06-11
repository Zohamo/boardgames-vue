import GameDetails from "@/views/GameDetails.vue";
import GamesList from "@/views/GamesList.vue";
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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
