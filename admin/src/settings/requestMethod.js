import axios from "axios";

const restApiProtocol = axios.create({
  baseURL: "http://deployUrl" || "http://localhost:3001/api",
});

export default restApiProtocol;
