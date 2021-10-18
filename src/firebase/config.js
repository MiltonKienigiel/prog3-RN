// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAejwMMq62dS6zqPjvEAINmAltFTgUI0lg",
  authDomain: "rn-udesa-8d6f3.firebaseapp.com",
  projectId: "rn-udesa-8d6f3",
  storageBucket: "rn-udesa-8d6f3.appspot.com",
  messagingSenderId: "133914031376",
  appId: "1:133914031376:web:74bd66eef29b529f01a195"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();