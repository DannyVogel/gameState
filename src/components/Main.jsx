import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loader from "./Loader";
import GameSearch from "./GameSearch";
import GamesPlayedList from "./GamesPlayedList";
import GamesToPlayList from "./GamesToPlayList";
import Footer from "./Footer";
import { auth, onAuthStateChanged, db, ref, onValue } from "../config/firebase";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [userUID, setUserUID] = useState("");
  const [page, setPage] = useState("search");
  const [gamesPlayedList, setGamesPlayedList] = useState(() => []);
  const [gamesToPlayList, setGamesToPlayList] = useState(() => []);

  const [loading, setLoading] = useState(true);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isMounting, setIsMounting] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedIn(true);
        setUser(user.email.slice(0, user.email.indexOf("@")));
        setUserUID(uid);
        const gamesPlayedRef = ref(
          db,
          `gameState/users/${uid}/gamesPlayedList`
        );
        onValue(gamesPlayedRef, (snapshot) => {
          const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
          setGamesPlayedList(data);
        });
        const gamesToPlayRef = ref(
          db,
          `gameState/users/${uid}/gamesToPlayList`
        );
        onValue(gamesToPlayRef, (snapshot) => {
          snapshot.exists()
            ? setGamesToPlayList(Object.values(snapshot.val()))
            : setGamesToPlayList([]);
        });
        setIsUnmounting(true);
        setTimeout(() => {
          setLoading(false);
          setIsMounting(true);
        }, 1000);
      } else {
        setLoggedIn(false);
        setUser("");
        setUserUID("");
        setIsUnmounting(true);
        setTimeout(() => {
          setLoading(false);
          setIsMounting(true);
        }, 1000);
        // User is signed out
      }
    });
  }, []);

  function handlePageChange(e) {
    const { id } = e.target;
    setPage(id);
  }

  return (
    <>
      {loading ? (
        <Loader isUnmounting={isUnmounting} />
      ) : (
        <div className={`appContainer ${isMounting && "fade-in"}`}>
          {page === "search" ? (
            <GameSearch
              userUID={userUID}
              user={user}
              gamesPlayedList={gamesPlayedList}
              gamesToPlayList={gamesToPlayList}
            />
          ) : null}
          {page === "gamesToPlay" ? (
            <GamesToPlayList userUID={userUID} />
          ) : null}
          {page === "gamesPlayed" ? (
            <GamesPlayedList userUID={userUID} />
          ) : null}
        </div>
      )}
    </>
  );
}
