// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firestore
export const db = getFirestore(app);

export default app;
