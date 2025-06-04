const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 3001, path: "/peerjs" });

console.log("PeerJS sunucu çalışıyor: http://localhost:3001/peerjs");
