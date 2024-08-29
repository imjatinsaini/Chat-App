import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOut = () => {
  return (
    auth.currentUser && (
      <button
        onClick={() => signOut(auth)}
        className="bg-gradient-to-r from-blue-400 to-purple-300 text-white px-4 py-2 rounded-lg transform transition-all duration-300 ease-in-out shadow-2xl hover:from-purple-300 hover:to-blue-400 hover:scale-110 active:scale-95"
      >
        Sign Out
      </button>
    )
  );
};

export default SignOut;
