import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "@/config/firebase";

export default class AuthController {
  static async logIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        return {
          success: true,
          user: userCredential.user,
        };
      }
    } catch (error) {
      console.log(error.code, error.message);
      return {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      };
    }
  }

  static async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      };
    }
  }

  static async logOut() {
    try {
      const res = await signOut(auth);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

  static async guestLogIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "guest@guest.com",
        "123456"
      );
      if (userCredential) {
        return {
          success: true,
          user: userCredential.user,
        };
      }
    } catch (error) {
      console.log(error.code, error.message);
      return {
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      };
    }
  }
}
