
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"]  // ensure fallback works
});

export default socket;
