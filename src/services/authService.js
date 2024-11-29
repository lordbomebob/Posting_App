import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../firebaseConfig";

const auth = getAuth(app);

// Sign-in function
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign-up function
export const register = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign-out function
export const logout = async () => {
  return signOut(auth);
};
