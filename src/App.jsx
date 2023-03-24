import React, {useState} from 'react'
import Header from './components/Header'
import { auth, onAuthStateChanged } from "./firebaseConfig";
import GameSearch from './components/GameSearch';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')

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

  return (
    <div className='appContainer'>
      <Header 
        loggedIn={loggedIn}
        user={user}
      />
      <p className='introText'>Find a game and add it to a list of games played or games you want to play!</p>
      <GameSearch />
    </div>
  )
}

