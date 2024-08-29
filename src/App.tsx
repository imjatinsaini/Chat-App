// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./firebase";
// import SignIn from "./components/SignIn";
// import SignOut from "./components/SignOut";
// import ChatRoom from "./components/ChatRoom";
// import UserList from "./components/UserList";

// const App: React.FC = () => {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App ">
//       <Router>
//         <header className="header  ">
//           <h1 className="tracking-widest ">Vediv Vaibhav Astrology </h1>
//           <SignOut />
//         </header>

//         <section>
//           {user ? (
//             <Routes>
//               <Route path="/" element={<UserList />} />
//               <Route path="/chat/:chatId" element={<ChatRoom />} />
//             </Routes>
//           ) : (
//             <SignIn />
//           )}
//         </section>
//       </Router>
//     </div>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import ChatRoom from "./components/ChatRoom";
import UserList from "./components/UserList";

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <header className="header flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-2xl md:text-3xl text-white">Ch-astro</h1>
            <div className="flex flex-row gap-5">
          <div className="flex items-center">
            {user && (
              <>
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="rounded-full h-10 w-10 mr-3"
                />
                <span>{user.displayName}</span>
              </>
            )}
          </div>
          <SignOut />
          </div>
        </header>

        <section>
          {user ? (
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/chat/:chatId" element={<ChatRoom />} />
            </Routes>
          ) : (
            <SignIn />
          )}
        </section>
      </Router>
    </div>
  );
};

export default App;


