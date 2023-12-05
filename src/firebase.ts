// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6r-IhYEdXFgjl8NYyYI9ja5qCRZt3xXs",
  authDomain: "nwitter-reloaded-5a315.firebaseapp.com",
  projectId: "nwitter-reloaded-5a315",
  storageBucket: "nwitter-reloaded-5a315.appspot.com",
  messagingSenderId: "501062131563",
  appId: "1:501062131563:web:3a13f7610dc84a6cdb362e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);