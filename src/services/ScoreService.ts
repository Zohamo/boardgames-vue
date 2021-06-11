import { ScytheGame } from "@/types";
import games from "@/assets/json/scythe-games.json";

export default {
  /* async  */ getGames(gameSlug: string) /* : Promise<ScytheGame[]> */ {
    return games;
    return fetch(`${process.env.VUE_APP_API_URL}/scores/${gameSlug}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("score.getGames", error);
      });
  },
};
