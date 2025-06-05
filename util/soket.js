import { io } from "socket.io-client";

const socket = io("https://server-socket-production-86ed.up.railway.app");
export default socket;
