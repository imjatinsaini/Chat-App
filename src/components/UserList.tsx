// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db, auth } from "../firebase";
// import { useNavigate } from "react-router-dom";


// interface User {
//   uid: string;
//   name: string;
//   email: string;
//   photoURL: string;
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = collection(db, "users");
//       const userSnapshot = await getDocs(usersCollection);
//       const userList = userSnapshot.docs.map(doc => doc.data() as User);
//       setUsers(userList);
//     };

//     fetchUsers();
//   }, []);

//   const startChat = (selectedUser: User) => {
//     const currentUser = auth.currentUser;
//     if (currentUser && selectedUser.uid !== currentUser.uid) {
//       const chatId = [currentUser.uid, selectedUser.uid].sort().join("_");
//       navigate(`/chat/${chatId}`, { state: { selectedUser } });
//     }
//   };

//   return (
//     <div className="user-list">
//       <h2>Select a user to chat with:</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="text-left py-2 px-4">Name</th>
//             <th className="text-left py-2 px-4">Email</th>
//             <th className="text-left py-2 px-4">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.uid}>
//               <td className="py-2 px-4">{user.name}</td>
//               <td className="py-2 px-4">{user.email}</td>
//               <td className="py-2 px-4">
//                 <button
//                   onClick={() => startChat(user)}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Chat
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data() as User);

      // Filter out the logged-in user
      const filteredUsers = userList.filter(user => user.uid !== auth.currentUser?.uid);
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, []);

  const startChat = (selectedUser: User) => {
    const currentUser = auth.currentUser;
    if (currentUser && selectedUser.uid !== currentUser.uid) {
      const chatId = [currentUser.uid, selectedUser.uid].sort().join("_");
      navigate(`/chat/${chatId}`, { state: { selectedUser } });
    }
  };

  return (
    <div className="user-list ">
      <h2 className="text-gray-500 text-center items-center text-xl md:text-3xl  uppercase p-10 bg-[#FFF9F3]">Select a user to chat with:</h2>
      <table className="min-w-full bg-[#FFF9F3]">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 text-xs md:text-base  md:px-12">Name</th>
            <th className="text-left py-2 px-4 text-xs md:text-base  md:px-12">Email</th>
            <th className="text-left py-2 px-4 text-xs md:text-base  md:px-12">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.uid}>
              <td className="py-4 px-4 text-xs md:text-base  md:px-12">{user.name}</td>
              <td className="py-4 px-4 text-xs md:text-base md:px-12">{user.email}</td>
              <td className="py-4 px-4 text-xs md:text-base   md:">
                <button
                  onClick={() => startChat(user)}
                  className="bg-gradient-to-r from-blue-400 to-purple-300 transform transition-all duration-300 ease-in-out  hover:from-purple-300 hover:to-blue-400  text-white p-2  md:px-12  hover:scale-110 active:scale-95 rounded-3xl shadow-xl"
                >
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

//  px-4 py-2 rounded-lg transform transition-all duration-300 ease-in-out shadow-2xl hover:from-purple-300 hover:to-blue-400 hover:scale-110 active:scale-95