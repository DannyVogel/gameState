import React, { useState, useEffect } from "react";
import GamesToPlayCard from "@/components/GamesToPlayCard";
import { Triangle } from "react-loader-spinner";
import useUserStore from "@/stores/userStore";

export default function GamesToPlay() {
  const UID = useUserStore((state) => state.UID);
  const gameList = useUserStore((state) => state.gameList);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const listRef = ref(db, `gameState/users/${UID}/gameList`);
  //   onValue(listRef, (snapshot) => {
  //     snapshot.exists()
  //       ? setSavedList(Object.values(snapshot.val()))
  //       : setSavedList([]);
  //   });
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, [savedList]);

  function renderList() {
    if (gameList.length < 1) {
      if (!UID) {
        return <p>Please sign up or sign in to see list</p>;
      }
      return <p>No games found</p>;
    }
    return gameList.map((game) => {
      if (game.status === "toPlay")
        return <GamesToPlayCard key={game.id} result={game} />;
    });
  }

  return (
    <div className="gameListContainer mb-14">
      <h1 className="text-center font-bold text-2xl mb-10">Games To Play</h1>
      {loading ? (
        <Triangle
          height="80"
          width="80"
          color="#FFFFFF"
          ariaLabel="triangle-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        renderList()
      )}
    </div>
  );
}
