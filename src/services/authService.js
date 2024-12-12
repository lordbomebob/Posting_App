import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import app from "../firebaseConfig";

const auth = getAuth(app);

// Add user to Firestore with the specified schema
const addUserToFirestore = async (user) => {
  const userRef = doc(db, "Users", user.uid); // Accessing the "Users" collection
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      userId: user.uid,
      username: "", // Placeholder, update via profile edit later
      fullName: "", // Placeholder, update via profile edit later
      bio: "", // Placeholder, update via profile edit later
      profilePicUrl: "", // Placeholder, update via profile edit later
      joiningDate: serverTimestamp(), // Auto-filled timestamp
      posts: [], // Empty array to start with
      likedPosts: [], // Empty array to start with
      savedPosts: [], // Empty array to start with
      repliedPosts: [], // Empty array to start with
      reposts: [], // Empty array to start with
    });
  }
};

// Sign-up function
export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addUserToFirestore(userCredential.user);
  return userCredential.user;
};

// Sign-in function
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addUserToFirestore(userCredential.user); // Ensure user exists in Firestore on login
  return userCredential.user;
};

// Sign-out function
export const logout = async () => {
  return signOut(auth);
};
