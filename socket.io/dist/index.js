"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const io = require("socket.io")(process.env.PORT, {
    cors: {
        origin: "*",
    },
});
console.log("Puerto Socket", process.env.PORT);
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
    console.log("User connected.");
    //Se añade el usuario a las personas conectadas
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    });
    //Cuando se manda un mensaje
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        try {
            console.log("El que lo manda es", senderName);
            const user = getUser(receiverName);
            console.log("manda notificacion", user);
            io.to(user.socketId).emit("getNotification", {
                senderName: senderName.email.split("@", 1),
                type
            });
        }
        catch (err) {
            console.log(err);
        }
    });
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
//# sourceMappingURL=index.js.map