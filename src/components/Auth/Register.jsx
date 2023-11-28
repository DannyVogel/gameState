import { useState } from "react";
import AuthController from "../../services/api/firebase";
import useUserStore from "../../stores/userStore";

const Register = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setUID = useUserStore((state) => state.setUID);
  const setLogged = useUserStore((state) => state.setLogged);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const register = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await AuthController.register(
      registerForm.email,
      registerForm.password
    );
    if (res.success) {
      handleAuthSuccess(res.user);
    } else {
      const { errorCode, errorMessage } = res;
      console.log(errorCode, errorMessage);
      setErrorMessage(errorCode, errorMessage);
    }
  };

  const handleAuthSuccess = (user) => {
    const { email, uid } = user;
    setUser(sliceEmail(email));
    setUID(uid);
    setLogged(true);
    setTimeout(() => {
      props.handleProfileClick();
    }, 1500);
  };

  return (
    <form onSubmit={register}>
      <fieldset className="logInForm">
        <legend>Sign Up</legend>
        <label htmlFor="signUpEmail" className="">
          Email:
        </label>
        <input
          type="email"
          name="signUpEmail"
          id="signUpEmail"
          value={registerForm.email}
          onChange={handleChange}
        />
        <label htmlFor="signUpPassword" className="">
          Password:
        </label>
        <input
          type="password"
          name="signUpPassword"
          id="signUpPassword"
          value={registerForm.password}
          onChange={handleChange}
        />
        <button className="logInBtn btn">Sign up</button>
      </fieldset>
    </form>
  );
};

export default Register;
