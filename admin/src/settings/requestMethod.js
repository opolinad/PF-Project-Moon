import axios from "axios";

const restApiProtocol = axios.create({
  baseURL: "https://protocolmoon.herokuapp.com/api" || "http://localhost:3001/api",
});

export default restApiProtocol;
