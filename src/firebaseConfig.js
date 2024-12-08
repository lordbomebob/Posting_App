// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add Firestore import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUEuaCoQl5n7PFnZSDJvC19rCGw6M-l3s",
  authDomain: "threadsclone-df62c.firebaseapp.com",
  projectId: "threadsclone-df62c",
  storageBucket: "threadsclone-df62c.firebasestorage.app",
  messagingSenderId: "1023962432047",
  appId: "1:1023962432047:web:07dcb8c0ce6785d4767cda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initialize Firestore and export it

export default app;
