import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Index from "@/components//Home/Index";
import { auth, onAuthStateChanged, db, ref, onValue } from "@/config/firebase";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isMounting, setIsMounting] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
  }, []);

  return (
    <>
      {loading ? (
        <Loader isUnmounting={isUnmounting} />
      ) : (
        <div
          className={`appContainer ${
            isMounting && "fade-in"
          } flex-grow flex flex-col justify-around items-center`}
        >
          <Index />
        </div>
      )}
    </>
  );
}
