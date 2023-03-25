import React, {useEffect, useState} from 'react'
import Header from './components/Header'
import GameSearch from './components/GameSearch';
import GamesPlayedList from './components/GamesPlayedList';
import GamesToPlayList from './components/GamesToPlayList';
import Footer from './components/Footer'
import { auth, onAuthStateChanged } from "./firebaseConfig";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [userUID, setUserUID] = useState('')
  const [page, setPage] = useState('search')


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedIn(true)
        setUser(user.email.slice(0, (user.email).indexOf("@")))
        setUserUID(uid)
      } else {
        setLoggedIn(false)
        // User is signed out
      }
    });
  }, [])
    

  function handlePageChange(e){
    const {id} = e.target
    setPage(id)
  }

  return (
    <div className="appContainer">
      <Header loggedIn={loggedIn} user={user} />
      {page === "search" ? <GameSearch userUID={userUID} /> : null}
      {page === "gamesToPlay" ? <GamesToPlayList userUID={userUID} /> : null}
      {page === "gamesPlayed" ? <GamesPlayedList userUID={userUID} /> : null}

      <Footer handlePageChange={(e) => handlePageChange(e)} />
    </div>
  );
}

