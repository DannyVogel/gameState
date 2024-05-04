import axios from "axios";
import Result from "@/utility/resultsConstructor";

export class RAWGController {
  static async searchGames(searchTerm) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_RAWG_API_KEY
        }&search=${searchTerm}`
      );
      if (response.status !== 200) {
        throw new Error("Error: ", response);
      }
      return response.data.results.map((result) => new Result(result));
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getGameDetails(id) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${
          import.meta.env.VITE_RAWG_API_KEY
        }`
      );
      if (response.status !== 200) {
        throw new Error("Error: ", response);
      }
      return new Result(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
