// /app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function generateRandomUsername() {
  const prefix = ["User", "Guest", "Viewer", "Member"];
  const randomNum = Math.floor(Math.random() * 10000);
  return `${prefix[Math.floor(Math.random() * prefix.length)]}_${randomNum}`;
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const username = generateRandomUsername();
    router.push(`/meeting/${encodeURIComponent(username)}`);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <p>Toplantıya bağlanıyor...</p>
    </div>
  );
}
