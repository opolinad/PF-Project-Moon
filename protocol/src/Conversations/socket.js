import io from "socket.io-client";

const socket = io.connect("https://socket-io-protocol-moon.herokuapp.com/")

export default socket;
