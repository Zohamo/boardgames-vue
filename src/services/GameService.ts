import boardgames from "@/assets/json/boardgames.json";
import { Game } from "@/types";
// import axios from "axios";

/* const apiClient = axios.create({
  baseURL: "https://api.mathiasmille.fr/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}); */

export default {
  getGames(): Game[] {
    return boardgames;
  },
  /* getGames() : Promise<Game[]> {
    return apiClient.get("/boardgames");
  }, */
};
