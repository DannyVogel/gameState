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
  const [page, setPage] = useState('search')


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedIn(true)
        setUser(user.email.slice(0, (user.email).indexOf("@")))
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
    <div className='appContainer'>
      <Header 
        loggedIn={loggedIn}
        user={user}
      />
      {page === 'search' ? <GameSearch /> : null}
      {page === 'gamesToPlay' ? <GamesToPlayList /> : null}
      {page === 'gamesPlayed' ? <GamesPlayedList /> : null}

      <Footer 
        handlePageChange={(e) => handlePageChange(e)}
      />

    </div>
  )
}

