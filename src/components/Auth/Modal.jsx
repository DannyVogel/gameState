import { useState } from "react";
import AuthController from "@/services/api/firebase";
import { sliceEmail } from "@/utils";
import useUserStore from "@/stores/userStore";
import LogIn from "@/components/Auth/LogIn";
import Register from "@/components/Auth/Register";

export default function Modal(props) {
  const setUser = useUserStore((state) => state.setUser);
  const setUID = useUserStore((state) => state.setUID);
  const setLogged = useUserStore((state) => state.setLogged);
  const user = useUserStore((state) => state.user);
  const isLogged = useUserStore((state) => state.isLogged);

  const [signInMethod, setSignInMethod] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const switchSignInMethod = () => {
    setSignInMethod((prev) => !prev);
  };

  const handleSignOut = async () => {
    await AuthController.logOut();
  };

  const guestLogIn = async () => {
    const res = await AuthController.guestLogIn();
    if (res.success) {
      authSuccess(res.user);
    } else {
      setErrorMessage("Incorrect email or password");
    }
  };

  const authSuccess = (user) => {
    const { email, uid } = user;
    setUser(sliceEmail(email));
    setUID(uid);
    setLogged(true);
    setTimeout(() => {
      props.authClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={props.authClose}>
      <div
        className="profileModalContainer"
        onClick={(event) => event.stopPropagation()}
      >
        {!isLogged ? (
          <>
            {signInMethod ? (
              <LogIn authClose={props.authClose} />
            ) : (
              <Register authClose={props.authClose} />
            )}

            <div class="mt-10 flex flex-col items-center gap-1">
              <p
                className="cursor-pointer hover:text-primary"
                onClick={switchSignInMethod}
              >
                {signInMethod
                  ? "New user? Sign up here"
                  : "Already a user? Sign in here"}
              </p>
              <p className="text-sm underline" onClick={guestLogIn}>
                Log in as Guest
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="font-bold text-xl">
              Hello{" "}
              <span className="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
                {user}
              </span>
            </p>
            <button className="btn btn-error" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
