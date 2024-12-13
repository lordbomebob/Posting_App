import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import app, { db } from "../firebaseConfig";

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

// Helper function to store userId in localStorage
const storeUserId = (userId) => {
  localStorage.setItem("userId", userId);
};

// Helper function to retrieve userId from localStorage
const getStoredUserId = () => {
  return localStorage.getItem("userId");
};

// Sign-up function
export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await addUserToFirestore(userCredential.user);
  storeUserId(userCredential.user.uid); // Store userId in localStorage
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
  storeUserId(userCredential.user.uid); // Store userId in localStorage
  return userCredential.user;
};

// Check if userId exists in localStorage
export const getCurrentUserId = () => {
  return getStoredUserId();
};

// Sign-out function
export const logout = async () => {
  localStorage.removeItem("userId"); // Clear userId from localStorage
  return signOut(auth);
};

//return uid
export const getLocalUid=()=>{
  return localStorage.current_user?JSON.parse(localStorage.current_user).uid:false
}
