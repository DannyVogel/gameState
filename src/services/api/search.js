import axios from "axios";
import FireStoreController from "./firestore";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export class SearchController {
  static async search(query) {
    console.log("searching for game");
    const token = await this.init();
    try {
      const response = await axios.get(`${SERVER_URL}/api/search/${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("search response", response);
      return response.data.body;
    } catch (error) {
      console.error(error);
    }
  }

  static async getGameInfo(gameList, token) {
    try {
      const response = await axios.post(
        "http://localhost:3000/searchByIdAndPublished",
        {
          gameList,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      console.log("gameInfo", response.data.body);
      localStorage.setItem("gameInfo", JSON.stringify(response.data.body));
    } catch (error) {
      console.error(error);
    }
  }
}
