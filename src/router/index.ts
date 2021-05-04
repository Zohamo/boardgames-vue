import GameDetails from "@/views/GameDetails.vue";
import GamesList from "@/views/GamesList.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "GamesList",
    component: GamesList,
  },
  {
    path: "/game/:id",
    name: "GameDetails",
    props: true,
    component: GameDetails,
    props: {
      type: Number,
      required: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
