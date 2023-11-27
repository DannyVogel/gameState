import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@/config/firebase";

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (userCredential) {
      console.log("usercredential", userCredential);
      return {
        success: true,
        user: userCredential.user,
      };
    }
  } catch (error) {
    console.log(error.code, error.message);

  }
      return {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      };
    });
};
function processSignUpFormData(e) {
  e.preventDefault();
  setErrorMessage("");
  createUserWithEmailAndPassword(
    auth,
    signUpFormData.signUpEmail,
    signUpFormData.signUpPassword
  )
    .then((userCredential) => {
      setTimeout(() => {
        props.handleProfileClick();
      }, 1500);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
}
function handleSignOut() {
  signOut(auth)
    .then(() => {
      setTimeout(() => {
        props.handleProfileClick();
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}