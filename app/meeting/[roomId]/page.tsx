// /app/meeting/[roomId]/page.tsx

import React from "react";
import VideoCall from "../../components/VideoCall";

export default async function MeetingPage({ params }) {
  const { roomId } = await params;
  return (
    <div>
      <h1>Hoşgeldin, {decodeURIComponent(roomId)}</h1>
      <VideoCall username={decodeURIComponent(roomId)} />
    </div>
  );
}
