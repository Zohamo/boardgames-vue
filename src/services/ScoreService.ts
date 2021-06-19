import { ScythePlay } from "@/types";
import plays from "@/assets/json/scythe-plays.json";

export default {
  /* async  */ getPlays(gameSlug: string) /* : Promise<ScythePlay[]> */ {
    return plays;
    return fetch(`${process.env.VUE_APP_API_URL}/scores/${gameSlug}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("score.getPlays", error);
      });
  },
};
