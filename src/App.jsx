import React, {useState} from 'react'
import SignIn from './components/SignIn'
import { auth, onAuthStateChanged } from "./firebaseConfig";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setLoggedIn(true)
      console.log(user.email)
    } else {
      setLoggedIn(false)
      // User is signed out
    }
  });

  return (
    <div>
      <SignIn />
      <h1>{loggedIn ? "Logged in!" : "Not logged in!"}</h1>
    </div>
  )
}

