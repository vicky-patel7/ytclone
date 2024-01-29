// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqLlVzDPKp1dZn8zKIC7cj-ilY1j4IarQ",
  authDomain: "videotube-8d69c.firebaseapp.com",
  projectId: "videotube-8d69c",
  storageBucket: "videotube-8d69c.appspot.com",
  messagingSenderId: "1439827461",
  appId: "1:1439827461:web:4f59a1a03fd11538033e6c",
  measurementId: "G-RS4ENCWKSL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();