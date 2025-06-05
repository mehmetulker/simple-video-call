"use client";

import { useSearchParams, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const VideoChat = dynamic(() => import("../../components/VideoChat"), {
  ssr: false,
});

export default function RoomPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const username = searchParams.get("username") || "anonymous";
  const roomId = params.roomId as string; // güvenli şekilde alıyoruz

  return (
    <div>
      <h1>Oda: {roomId}</h1>
      <p>Kullanıcı: {username}</p>
      <VideoChat roomId={roomId} username={username} />
    </div>
  );
}
