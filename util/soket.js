import { io } from "socket.io-client";

const socket = io("https://slow-pianos-unite.loca.lt"); // backend adresi
export default socket;
