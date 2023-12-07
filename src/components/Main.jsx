import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, db, ref, onValue } from "@/config/firebase";
import Loader from "@/components/Loader";
import Index from "@/components//Home/Index";
import useUserStore from "@/stores/userStore";
import FireStoreController from "@/services/api/firestore";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isMounting, setIsMounting] = useState(false);
  const setGameList = useUserStore((state) => state.setGameList);
  const UID = useUserStore((state) => state.UID);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        FireStoreController.getGameList(uid).then((gameList) => {
          setGameList(gameList);
        });
        setIsUnmounting(true);
        setTimeout(() => {
          setLoading(false);
          setIsMounting(true);
        }, 1000);
      } else {
        setIsUnmounting(true);
        setTimeout(() => {
          setLoading(false);
          setIsMounting(true);
        }, 1000);
        // User is signed out
      }
    });
    if (UID) {
      const listRef = ref(db, `gameState/users/${UID}/gameList`);
      onValue(listRef, (snapshot) => {
        const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
        setGameList(data);
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader isUnmounting={isUnmounting} />
      ) : (
        <div
          className={`appContainer ${
            isMounting && "fade-in"
          } flex-grow flex flex-col justify-around items-center overflow-hidden`}
        >
          <Index />
        </div>
      )}
    </>
  );
}
