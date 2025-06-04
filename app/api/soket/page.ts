import { app, server } from "../../../util/soket";
import { NextApiRequest } from "next";
import { Server } from "socket.io";

// Sadece bir kez başlatmak için
if (!app.socketServer) {
  const io = new Server(server);
  app.socketServer = io;

  io.on("connection", (socket) => {
    console.log("Yeni kullanıcı bağlandı:", socket.id);

    // Örnek olay: Mesaj gönderme
    socket.on("send-message", (message) => {
      io.emit("receive-message", message); // Herkese yayınla
    });

    socket.on("disconnect", () => {
      console.log("Kullanıcı ayrıldı:", socket.id);
    });
  });
}

// API Route için boş yanıt
export default function handler(req: NextApiRequest, res: any) {
  res.end();
}
