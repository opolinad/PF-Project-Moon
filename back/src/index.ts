import  {Request, Response} from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import { dbConnect } from './db';
import cookieSession from "cookie-session";
const allRoute = require('./routes/routes')
const app = express();
const http = require('http')
// const { Server } = require('socket.io') 
dotenv.config()

app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60* 100 }));
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', allRoute)

app.listen(process.env.PORT, () => {
    dbConnect()
    console.log('Server on PORT'+process.env.PORT)
})

// const server = http.createServer(app)
// const io = new Server(server, {
//   cors:{
//     origin:'http://localhost:4000/'
//   }
// })

const io = require("socket.io")(process.env.PORT_SOCKET, {
  cors: {
    origin: "*",
  },
});
console.log("Puerto Socket",process.env.PORT_SOCKET)
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
  socket.on("sendMessage", ({ senderId, receiverId, text }:{senderId:string, receiverId:string, text:string}) => {
    const user: any = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("sendNotification",({ senderName, receiverName, type }:{senderName:any, receiverName:string, type:number}) =>{
    try {
      console.log("El que lo manda es",senderName);
      
      const user: any = getUser(receiverName);
      console.log("manda notificacion",user);
    io.to(user.socketId).emit("getNotification", {
      senderName: senderName.email.split("@",1),
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

// server.listen(3000,() => {
//   console.log('Socke.io conect')
// })
