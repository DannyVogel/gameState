import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, db, ref } from "../config/firebase";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedIn(true);
        setUser(user.email.slice(0, user.email.indexOf("@")));
        const gamesPlayedRef = ref(
          db,
          `gameState/users/${uid}/gamesPlayedList`
        );
      } else {
        setLoggedIn(false);
        setUser("");
        // User is signed out
      }
    });
  }, []);
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col ">
      <Header loggedIn={loggedIn} user={user} />

      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer handlePageChange={(e) => handlePageChange(e)} />
    </div>
  );
};

export default Layout;
