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

// Use this with admin account to migrate data from old to new DB structure
// function migrate() {
//   let oldPlayedData;
//   let xUID = ""; // Add UID here if migration is needed
//   const gamesPlayedRef = ref(db, `gameState/users/${xUID}/gamesPlayedList`);
//   onValue(gamesPlayedRef, (snapshot) => {
//     oldPlayedData = snapshot.exists() ? Object.values(snapshot.val()) : [];
//   });

//   let oldToPlayData;
//   const gamesToPlayRef = ref(db, `gameState/users/${xUID}/gamesToPlayList`);
//   onValue(gamesToPlayRef, (snapshot) => {
//     oldToPlayData = snapshot.exists() ? Object.values(snapshot.val()) : [];
//   });

//   if (oldPlayedData) {
//     oldPlayedData.flat().forEach((game) => {
//       FireStoreController.addToList(xUID, game);
//     });
//   }
//   if (oldToPlayData) {
//     oldToPlayData.flat().forEach((game) => {
//       game.status = "toPlay";
//       FireStoreController.addToList(xUID, game);
//     });
//   }
// }
