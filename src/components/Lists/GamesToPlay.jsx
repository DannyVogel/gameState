import React, { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { db, ref, onValue } from "@/config/firebase";
import GamesToPlayCard from "@/components/GamesToPlayCard";
import useUserStore from "@/stores/userStore";

export default function GamesToPlay() {
  const UID = useUserStore((state) => state.UID);
  const gameList = useUserStore((state) => state.gameList);
  const setGameList = useUserStore((state) => state.setGameList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listRef = ref(db, `gameState/users/${UID}/gameList`);
    onValue(listRef, (snapshot) => {
      const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
      setGameList(data);
    });
  }, []);

  function renderList() {
    if (gameList.length < 1) {
      if (!UID) {
        return (
          <p className="text-center">Please sign up or sign in to see list</p>
        );
      }
      return <p>No games found</p>;
    }
    return gameList.map((game) => {
      if (game.status === "toPlay")
        return <GamesToPlayCard key={game.id} result={game} />;
    });
  }

  return (
    <div className="gameListContainer max-w-2xl min-w-fit mx-auto mb-14">
      <h1 className="text-center font-bold text-2xl  mb-10">Games To Play</h1>
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
        <div className="mt-24">{renderList()}</div>
      )}
    </div>
  );
}
