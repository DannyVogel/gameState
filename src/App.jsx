import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
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
      <GameSearch />
      <Footer />
    </div>
  )
}

