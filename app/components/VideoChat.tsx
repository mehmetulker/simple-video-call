"use client";
import { useEffect, useRef } from "react";
import Peer from "peerjs";
import socket from "../../util/soket";

export default function VideoChat({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer(username, {
      host: "slow-pianos-unite.loca.lt",
      port: 3001,
      path: "/peerjs",
      secure: true,
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localRef.current) localRef.current.srcObject = stream;

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (remoteRef.current) remoteRef.current.srcObject = remoteStream;
          });
        });

        socket.emit("join-room", { roomId, peerId: username });

        socket.on("user-connected", (remoteId: string) => {
          const call = peer.call(remoteId, stream);
          call.on("stream", (remoteStream) => {
            if (remoteRef.current) remoteRef.current.srcObject = remoteStream;
          });
        });
      });

    return () => {
      peer.disconnect();
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Video Sohbet</h2>
      <video ref={localRef} autoPlay muted width={300} />
      <video ref={remoteRef} autoPlay width={300} />
    </div>
  );
}
