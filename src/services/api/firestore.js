import {
  db,
  ref,
  get,
  child,
  remove,
  update,
  gameStateDB,
} from "@/config/firebase";

export default class FireStoreController {
  static async getGameList(UID) {
    const listRef = ref(db, `gameState/users/${UID}/gameList`);
    const snapshot = await get(listRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  }

  static async addToList(UID, game) {
    const updates = {};
    updates[`/users/${UID}/gameList/${game.id}`] = game;
    update(gameStateDB, updates);
  }

  static async removeFromList(UID, gameID) {
    const gameRef = ref(db, `gameState/users/${UID}/gameList/${gameID}`);
    remove(gameRef);
  }
}

// function addGameToList(e, game) {
//   const list = e.target.id;
//   const updates = {};
//   updates[`/users/${UID}/${list}/${game.id}`] = [game];
//   update(gameStateDB, updates);
// }

// function removeFromList(e) {
//   const gameID = e.target.id;
//   if (gameID) {
//     const gameRef = ref(db, `gameState/users/${UID}/${isOnList}/${gameID}`);
//     remove(gameRef);
//   }
// }
