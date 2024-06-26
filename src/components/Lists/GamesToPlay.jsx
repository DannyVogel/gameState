import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import GamesToPlayCard from "@/components/GamesToPlayCard";
import useUserStore from "@/stores/userStore";
import FireStoreController from "@/services/api/firestore";

export default function GamesToPlay() {
  const UID = useUserStore((state) => state.UID);
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FireStoreController.getGameList(UID).then((gameList) => {
      setGameList(gameList);
    });
    setTimeout(() => setLoading(false), 500);
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
    <div className="gameListContainer max-w-2xl mx-auto mb-14">
      <h1 className="text-center font-bold text-2xl">Games To Play</h1>
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
        <div className="mt-10">{renderList()}</div>
      )}
    </div>
  );
}
