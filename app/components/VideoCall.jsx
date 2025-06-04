// /components/VideoCall.client.jsx
"use client";

import { useEffect, useRef } from "react";
import Peer from "peerjs";

export default function VideoCall({ username }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const peer = new Peer(username, {
      host: "localhost",
      port: 3001,
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });

        // Diğer kullanıcıya bağlan
        const otherUser = prompt("Bağlanmak istediğiniz kullanıcı kimliği:");
        if (otherUser) {
          const call = peer.call(otherUser, stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        }
      })
      .catch((err) => {
        alert("Kamera/mikrofon erişimi reddedildi.");
        console.error(err);
      });

    peerRef.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Sizin Görüntün:</h2>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "100%", marginBottom: 20 }}
      />
      <h2>Karşı Taraf:</h2>
      <video ref={remoteVideoRef} autoPlay style={{ width: "100%" }} />
    </div>
  );
}
