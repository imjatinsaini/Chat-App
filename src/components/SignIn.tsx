import React from "react";
import { auth, provider, signInWithPopup, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const storeUserInfo = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
};

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log("User signed in: ", result.user);
        await storeUserInfo(result.user);  // Store user info in Firestore after successful sign-in
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
  };

  return (
    <div className="text-center items-center justify-center pt-10 flex">
    <button onClick={signInWithGoogle} className="bg-gradient-to-r from-blue-400 to-purple-300 text-white px-4 py-2 rounded-lg transform transition-all duration-300 ease-in-out shadow-2xl hover:from-purple-300 hover:to-blue-400 hover:scale-110 active:scale-95 p-3   rounded">
      Sign in with Google
    </button>
    </div>
  );
};

export default SignIn;
