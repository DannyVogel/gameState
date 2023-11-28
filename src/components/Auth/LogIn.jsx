import { useState } from "react";
import AuthController from "../../services/api/firebase";
import useUserStore from "../../stores/userStore";

const LogIn = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setUID = useUserStore((state) => state.setUID);
  const setLogged = useUserStore((state) => state.setLogged);
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    const res = await AuthController.logIn(logInForm.email, logInForm.password);
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
    <form onSubmit={logIn}>
      <fieldset className="flex flex-col gap-4">
        <legend>Sign In</legend>
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={logInForm.email}
          onChange={handleChange}
          className="input"
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
          className="input"
        />
        <p className="errorMessage">{errorMessage ? errorMessage : " "}</p>
        <button className="btn btn-primary">Sign In</button>
      </fieldset>
    </form>
  );
};

export default LogIn;
