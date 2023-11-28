import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { auth, onAuthStateChanged, db, ref } from "../config/firebase";
import { sliceEmail } from "../utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useUserStore from "../stores/userStore";

const Layout = () => {
  const setUID = useUserStore((state) => state.setUID);
  const setUser = useUserStore((state) => state.setUser);
  const setLogged = useUserStore((state) => state.setLogged);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        console.log("auth state changed", user.uid, user.email);
        setLogged(true);
        setUID(uid);
        setUser(sliceEmail(email));
        const gamesPlayedRef = ref(
          db,
          `gameState/users/${uid}/gamesPlayedList`
        );
      } else {
        setLogged(false);
        setUser("");
        setUID("");
        // User is signed out
      }
    });
  }, []);
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col ">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
