"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const VideoChat = dynamic(() => import("../../components/VideoChat"), {
  ssr: false,
});

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = React.use(params);
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "anonymous";

  return (
    <div>
      <h1>Oda: {roomId}</h1>
      <p>Kullanıcı: {username}</p>
      <VideoChat roomId={roomId} username={username} />
    </div>
  );
}
