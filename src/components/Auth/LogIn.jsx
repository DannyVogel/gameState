import { useState } from "react";
import { sliceEmail } from "@/utils";
import AuthController from "@/services/api/firebase";
import FireStoreController from "@/services/api/firestore";
import useUserStore from "@/stores/userStore";

const LogIn = (props) => {
  const setUser = useUserStore((state) => state.setUser);
  const setUID = useUserStore((state) => state.setUID);
  const setLogged = useUserStore((state) => state.setLogged);
  const setGameList = useUserStore((state) => state.setGameList);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLogInForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const logIn = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage("");
    const res = await AuthController.logIn(logInForm.email, logInForm.password);
    if (res.success) {
      handleAuthSuccess(res.user);
    } else {
      setErrorMessage("Incorrect email or password");
      setIsLoggingIn(false);
    }
  };

  const handleAuthSuccess = async (user) => {
    const { email, uid } = user;
    setUser(sliceEmail(email));
    setUID(uid);
    setLogged(true);
    const gameList = await FireStoreController.getGameList(uid);
    setGameList(gameList);
    setTimeout(() => {
      props.authClose();
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <form onSubmit={logIn}>
      <fieldset className="flex flex-col">
        <legend className="font-bold pl-1 underline">Log In</legend>
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={logInForm.email}
          onChange={handleChange}
          className={`input input-primary ${
            errorMessage ? "border-red-500" : ""
          } `}
        />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={logInForm.password}
          onChange={handleChange}
          className={`input input-primary ${
            errorMessage ? "border-red-500" : ""
          } `}
        />
        <p className="text-red-500">{errorMessage ? errorMessage : " "}</p>
        <button disabled={isLoggingIn} className="btn btn-primary mt-4">
          {isLoggingIn ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign In"
          )}
        </button>
      </fieldset>
    </form>
  );
};

export default LogIn;
