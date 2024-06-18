import axios from "axios";
import FireStoreController from "./firestore";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export class SearchController {
  static async search(query) {
    try {
      const response = await axios.get(`${SERVER_URL}/api/search/${query}`, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.body || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updateGameById(gameId) {
    // TODO: Implement this function
  }
}
