import GameDetails from "@/views/GameDetails.vue";
import GamesList from "@/views/GamesList.vue";
import MtgAbilities from "@/views/mtg/MtgAbilities.vue";
import RulesSevenWonders from "@/views/rules/RulesSevenWonders.vue";
import RulesTapestry from "@/views/rules/RulesTapestry.vue";
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
    path: "/games/7-wonders/rules",
    name: "RulesSevenWonders",
    component: RulesSevenWonders,
  },
  {
    path: "/games/mtg/rules/abilities",
    name: "MtgAbilities",
    component: MtgAbilities,
  },
  {
    path: "/games/scythe/scores",
    name: "ScoresScythe",
    component: ScoresScythe,
  },
  {
    path: "/games/tapestry/rules",
    name: "RulesTapestry",
    component: RulesTapestry,
  },
  {
    path: "/games/tapestry/scores",
    name: "ScoresTapestry",
    component: ScoresTapestry,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
