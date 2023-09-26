// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJMGnRhMNGpPce_SqAUjq3qtZPTY4KxOU",
  authDomain: "chatapp-5daf9.firebaseapp.com",
  projectId: "chatapp-5daf9",
  storageBucket: "chatapp-5daf9.appspot.com",
  messagingSenderId: "51919498634",
  appId: "1:51919498634:web:2132a9aad8b4ccce4eac73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore();