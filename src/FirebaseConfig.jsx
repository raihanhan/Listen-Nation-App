// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9bnCWUhGOsPPzr9vAgyB4CK57_Zcghs4",
  authDomain: "listen-app-b82a8.firebaseapp.com",
  projectId: "listen-app-b82a8",
  storageBucket: "listen-app-b82a8.appspot.com",
  messagingSenderId: "570664595865",
  appId: "1:570664595865:web:0f43de131d20a5e882e308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}