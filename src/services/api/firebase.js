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
      console.log(error.message);
      return {
        success: false,
        errorMessage: error.message,
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
      const errorMessage = error.message;
      console.log(errorMessage);
      return {
        success: false,
        errorMessage: errorMessage,
      };
    }
  }

  static async logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
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
      console.log(error.message);
      return {
        success: false,
        errorMessage: errorMessage,
      };
    }
  }
}
