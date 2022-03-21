import GameDetails from "@/views/GameDetails.vue";
import GamesList from "@/views/GamesList.vue";
import RulesMagicAbilities from "@/views/rules/RulesMagicAbilities.vue";
import ScoresScythe from "@/views/scores/ScoresScythe.vue";
import ScoresTapestry from "@/views/scores/ScoresTapestry.vue";
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
    path: "/games/magic/rules/abilities",
    name: "RulesMagicAbilities",
    component: RulesMagicAbilities,
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
  {
    path: "/games/tapestry/scores",
    name: "ScoresTapestry",
    component: ScoresTapestry,
    props: {
      type: String,
      required: true,
    },
  },
];

export default new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
