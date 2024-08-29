import  { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase";

interface Message {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
}

const ChatRoom: React.FC = () => {
  // const { chatId } = useParams<{ chatId: string }>();
  // const { state } = useLocation<{ selectedUser: { uid: string; name: string } }>();
   const { chatId } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId!, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Message[];
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { uid, photoURL } = auth.currentUser!;
  
    await addDoc(collection(db, "chats", chatId!, "messages"), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
  
    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-room ">
      <h2 className="text-center items-center  border bg-[#FFF9F3] p-4 uppercase font-mono text-blue-400 tracking-widest">Chatting with {state.selectedUser.name}...</h2>
      <div className="messages ">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className="form  ">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Write Something "
          className="input outline-none shadow-lg"
        />
        <button type="submit" disabled={!formValue} className="send-btn">
          Send🕊️
        </button>
      </form>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";

  return (
    
    <div className={`message ${messageClass}`}>
      <img
        src={photoURL || "https://api.adorable.io/avatars/40/abott@adorable.png"}
        alt="Avatar"
        className="avatar"
      />
      <p className="border p-2 px-4 bg-blue-200 rounded-3xl">{text}</p>
    </div>
  );
};

export default ChatRoom;
