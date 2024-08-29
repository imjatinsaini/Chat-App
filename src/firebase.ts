import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDS4zEOWsZQVjqSGUc6351zej_h0UUCH4",
  authDomain: "chat-app-346a6.firebaseapp.com",
  projectId: "chat-app-346a6",
  storageBucket: "chat-app-346a6.appspot.com",
  messagingSenderId: "568506917348",
  appId: "1:568506917348:web:459de1a8c02e4455cfa7f1",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, signInWithPopup };