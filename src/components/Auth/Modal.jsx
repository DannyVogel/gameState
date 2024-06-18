import { useState, useEffect } from "react";
import { sliceEmail } from "@/utils";
import { themeChange } from "theme-change";
import logo from "@/assets/gameConsole.png";
import AuthController from "@/services/api/firebase";
// import { RAWGController } from "@/services/api/rawg";
// import FireStoreController from "@/services/api/firestore";
import useUserStore from "@/stores/userStore";
import LogIn from "@/components/Auth/LogIn";
import Register from "@/components/Auth/Register";

export default function Modal(props) {
  const setUser = useUserStore((state) => state.setUser);
  const setUID = useUserStore((state) => state.setUID);
  const setLogged = useUserStore((state) => state.setLogged);
  const setGameList = useUserStore((state) => state.setGameList);
  const user = useUserStore((state) => state.user);
  const UID = useUserStore((state) => state.UID);
  const isLogged = useUserStore((state) => state.isLogged);
  const gameList = useUserStore((state) => state.gameList);
  const [theme, setTheme] = useState();
  const [signInMethod, setSignInMethod] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);
  const switchSignInMethod = () => {
    setSignInMethod((prev) => !prev);
  };

  const handleSignOut = async () => {
    setUser("");
    setUID("");
    setLogged(false);
    setGameList([]);
    await AuthController.logOut();
    props.authClose();
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

  // TODO: Fix this function
  // const updateGameData = async () => {
  //   setLoading(true);
  //   const gameIDs = gameList.map((game) => game.id);
  //   const gameData = await Promise.all(
  //     gameIDs.map((id) => {
  //       let game;
  //       return RAWGController.getGameDetails(id)
  //         .then((res) => {
  //           game = res;
  //           return RAWGController.getGameScreenshots(id);
  //         })
  //         .then((screenshots) => {
  //           game.screenshots = screenshots;
  //           return game;
  //         });
  //     })
  //   );
  //   gameData.forEach((game) => {
  //     FireStoreController.updateList(UID, game.id, game);
  //   });
  //   setLoading(false);
  // };
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

            <div className="mt-10 flex flex-col items-center gap-1">
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
            <img src={logo} alt="profile" className="hidden" />
            <p className="font-bold text-xl">
              Hello{" "}
              <span className="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
                {user}
              </span>
            </p>
            <p className="font-bold text-sm">Choose your color theme:</p>
            <div className="flex items-center gap-1">
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text text-xs">Night</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="radio theme-controller radio-xs"
                    value="night"
                    data-set-theme="night"
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text text-xs">Light</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="radio theme-controller radio-xs"
                    value="light"
                    data-set-theme="light"
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text text-xs">Luxury</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="radio theme-controller radio-xs"
                    value="luxury"
                    data-set-theme="luxury"
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-4">
                  <span className="label-text text-xs">Forest</span>
                  <input
                    type="radio"
                    name="theme-radios"
                    className="radio theme-controller radio-xs"
                    value="forest"
                    data-set-theme="forest"
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </label>
              </div>
            </div>
            {/* <button
              className="btn btn-sm btn-secondary"
              onClick={updateGameData}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {!loading && "Update Game Data"}
            </button> */}
            <button className="btn btn-sm btn-error" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
