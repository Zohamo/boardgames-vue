import { Game } from "@/types";

export default {
  async getGames(): Promise<Game[]> {
    return fetch(`${process.env.VUE_APP_API_URL}/boardgames`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("getGames", error);
      });
  },
  async getGame(id: number): Promise<Game> {
    return fetch(`${process.env.VUE_APP_API_URL}/boardgames/${id}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log("getGame", error);
      });
  },
};
