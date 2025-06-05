"use client";

import { useEffect, useRef } from "react";
import Peer from "peerjs";

export default function VideoChat({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer(username); // her kullanıcıya isim veriyoruz

    // Kullanıcının kamerasını al
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Bağlantı geldiğinde
        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        });

        // Diğer kullanıcıya bağlan
        const remotePeerId = roomId; // oda adı aynı zamanda diğer kişinin peerId’si olsun
        if (remotePeerId !== username) {
          const call = peer.call(remotePeerId, stream);
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        }
      });

    return () => {
      peer.disconnect();
    };
  }, [roomId, username]);

  return (
    <div>
      <h2>Bağlantı başlatılıyor...</h2>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "300px", border: "1px solid black" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        style={{ width: "300px", border: "1px solid black" }}
      />
    </div>
  );
}
