const express = require('express')
const app = express()
const server = require('http').Server(app)

import dotenv from 'dotenv';

dotenv.config()

const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});
  console.log("Puerto Socket",process.env.PORT)

  let users:any = [];
  
  const addUser = (userId:string, socketId:string) => {
    !users.some((user:any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId: string) => {
    users = users.filter((user:any) => user.socketId !== socketId);
  };
  
  const getUser = (userId:string) => {
    return users.find((user:any) => user.userId === userId);
  };
  
  io.on("connection", (socket:any) => {
    console.log("User connected.");
  
    //Se añade el usuario a las personas conectadas
    socket.on("addUser", (userId:string) => {
      addUser(userId, socket.id);
      console.log(users)
      io.emit("getUsers", users);
    });
  
    //Cuando se manda un mensaje
    socket.on("sendMessage", ({ sender, receiverId, text }:{sender:string, receiverId:string, text:string}) => {
      const user: any = getUser(receiverId);
      if(user) { 
        console.log(user.socketId,sender);
        
      io.to(user.socketId).emit("getMessage", {
        sender,
        text,
      });
      }
    });
  
    socket.on("sendNotification",({ senderName, receiverName, type }:{senderName:any, receiverName:string, type:number}) =>{
      try {
        const user: any = getUser(receiverName);
        console.log("manda notificacion",user);
      io.to(user.socketId).emit("getNotification", {
        senderName: senderName.username,
        type
      })
    } catch (err) {
      console.log(err)
    }
    })
  
    //Cuando un usuario se desconecta
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  
  server.listen(process.env.PORT,() => {
    console.log('Socke.io conect on port ', process.env.PORT)
  })
  