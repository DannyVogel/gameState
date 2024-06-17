import axios from "axios";
import FireStoreController from "./firestore";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export class IGDBController {
  static async init() {
    let tokenObject = await this.retrieveToken();
    if (!tokenObject.access_token) {
      tokenObject = await this.authenticate();
    } else {
      const valid = await this.isTokenValid(tokenObject.access_token);
      if (!valid) {
        tokenObject = await this.authenticate();
      }
    }
    return tokenObject.access_token;
  }

  static async authenticate() {
    console.log("authenticating");
    try {
      const response = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${
          import.meta.env.VITE_IGDB_CLIENT_ID
        }&client_secret=${
          import.meta.env.VITE_IGDB_CLIENT_SECRET
        }&grant_type=client_credentials`
      );
      console.log("response", response.data);
      if (response.status === 200) {
        const dateObject = new Date();
        dateObject.setSeconds(
          dateObject.getSeconds() + response.data.expires_in
        );

        const tokenObject = {
          access_token: response.data.access_token,
          expires: dateObject,
        };

        this.storeToken(tokenObject);
        return tokenObject;
      } else {
        throw new Error("Error: ", response);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async isTokenValid(token) {
    console.log("checking if token is valid");
    try {
      const response = await axios.get(`https://id.twitch.tv/oauth2/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      if (response.status !== 200) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  static async storeToken(token) {
    console.log("storing token");
    try {
      localStorage.setItem("igdb_access_token", JSON.stringify(token));
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async retrieveToken() {
    console.log("retrieving token");
    try {
      const token = JSON.parse(localStorage.getItem("igdb_access_token"));
      token && console.log("is expired?", new Date(token.expires) < new Date());
      if (token && new Date(token.expires) > new Date()) {
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

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
