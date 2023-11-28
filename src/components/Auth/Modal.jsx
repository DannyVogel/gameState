import { useState } from "react";
import AuthController from "../../services/api/firebase";
import { sliceEmail } from "../../utils";
import useUserStore from "../../stores/userStore";
import LogIn from "./LogIn";
import Register from "./Register";

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
    const res = await AuthController.logOut();
    // .then(() => {
    //   setTimeout(() => {
    //     props.handleProfileClick();
    //   }, 1000);
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    // });
  };

  const guestLogIn = async () => {
    const res = AuthController.guestLogIn();
    if (res.success) {
      handleAuthSuccess(res.user);
    } else {
      setErrorMessage("Incorrect email or password");
    }
  };

  const handleAuthSuccess = (user) => {
    const { email, uid } = user;
    setUser(sliceEmail(email));
    setUID(uid);
    setLogged(true);
    // setTimeout(() => {
    //   props.handleProfileClick();
    // }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={props.handleProfileClick}>
      <div
        className="profileModalContainer"
        onClick={(event) => event.stopPropagation()}
      >
        {!isLogged ? (
          <div className="">
            {signInMethod ? <LogIn /> : <Register />}

            <p className="logInMethodTxt" onClick={switchSignInMethod}>
              {signInMethod
                ? "New user? Sign up here"
                : "Already a user? Sign in here"}
            </p>

            <p className="logInMethodTxt" onClick={guestLogIn}>
              Log in as Guest
            </p>
          </div>
        ) : (
          <div className="profileInfo">
            <p>Hello {user}</p>
            <button className="btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
