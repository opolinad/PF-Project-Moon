import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import BandejaCss from './Bandeja.module.css'

const Bandeja = () => {
  const user = useSelector(state => state.user.currentUser);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = ("");

  useEffect(() => {
    socket.current = io('ws://localhost:3000/')
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => { //
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((follow) => users.some((user) => user.userId === follow))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/messages/" + currentChat?._id);
        setMessages(res.data);
        console.log(res)
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:3001/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
      <div className={BandejaCss.Bandeja}>
        <div className={BandejaCss.chatMenu}>
          <h1>Conversations </h1>
            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
        </div>
        <div className={BandejaCss.chatBox}>
            {currentChat ? (
              <div>
                <div className={BandejaCss.chatBoxTop}>
                  {messages.map((message) => (
                    // <div ref={scrollRef}>
                      <Message message={message} own={message.sender === user._id} />
                    // </div>
                  ))}
                </div>
                <div className={BandejaCss.chatFin}>
                  <textarea
                    className={BandejaCss.textArea}
                    placeholder="Enviar un mensaje..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className={BandejaCss.button} onClick={(e) => handleSubmit(e)}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className={BandejaCss.sinConversacion}>
                Abre un chat para empezar
              </span>
            )}
        </div>
        <div className={BandejaCss.ChatOnline}>
          <h1>OnlineUsers</h1>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
        </div>
      </div>
  );
}

  // useEffect(() => {
  //   socket.emit("conectado", nombre);
  // }, [nombre]);

  // useEffect(() => {
  //   socket.on("mensajes", (mensaje) => {
  //     setMensajes([...mensaje, mensaje]);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, [mensajes]);

//   const divRef = useRef(null);
//   useEffect(() => {
//     divRef.current.scrollIntoView({ behavior: "smooth" });
//   });

//   const submit = () => {
//     e.preventDefault();
//     socket.emit("mensaje", nombre, mensaje);
//     setMensaje("");
//   };

//   return (
//     <div>
//       <div>
//         {mensajes.map((e, i) => (
//           <div key={i}>
//             <div>{e.nombre}</div>
//             <div>{e.mensaje}</div>
//             <div ref={divRef}></div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={submit}>
//         <label htmlFor="">Escriba su mensaje</label>
//         <textarea
//           name=""
//           id=""
//           cols="30"
//           rows="10"
//           value={mensaje}
//           onChange={(e) => setMensaje(e.target.value)}
//         ></textarea>
//         <button>Enviar</button>
//       </form>
//     </div>
//   );
// };

export default Bandeja;
