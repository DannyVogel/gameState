import React, { useState, useEffect } from "react";
import GamesToPlayCard from "@/components/GamesToPlayCard";
import { db, ref, onValue } from "@/config/firebase";
import { Triangle } from "react-loader-spinner";
import useUserStore from "@/stores/userStore";

export default function GamesToPlay() {
  const UID = useUserStore((state) => state.UID);
  const [loading, setLoading] = useState(true);
  const [savedList, setSavedList] = useState(() => []);

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${UID}/gamesToPlayList`);
    onValue(gameRef, (snapshot) => {
      snapshot.exists()
        ? setSavedList(Object.values(snapshot.val()))
        : setSavedList([]);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [savedList]);

  function renderList(list) {
    if (list.length < 1) {
      if (!UID) {
        return <p>Please sign up or sign in to see list</p>;
      }
      return <p>No games found</p>;
    }
    return list.map((game) => {
      return (
        <GamesToPlayCard
          key={game[0].id}
          result={game[0]}
          onList={"gamesToPlayList"}
          userUID={UID}
        />
      );
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
        renderList(savedList)
      )}
    </div>
  );
}
