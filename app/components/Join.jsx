// pages/join.js
"use client";

import { useState } from "react"; // React bileşeni içinde state (durum) tutmak için
import { useRouter } from "next/navigation"; // Sayfa yönlendirme yapmak için

export default function Join() {
  const [username, setUsername] = useState(""); // kullanıcı adını tutar
  const router = useRouter(); // yönlendirme işlemleri için kullanılır // sayfa yönlendirme işlemi
  // Butona tıklanınca çalışır
  const handleJoin = () => {
    if (username.trim()) {
      router.push(`/meeting/abc123?username=${username}`);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl mb-4">Kullanıcı Adı Gir</h1>

      {/* Kullanıcıdan ad alınan input */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // input değişince state güncellenir
        placeholder="Adınızı girin"
        className="border px-4 py-2"
      />

      {/* Katıl butonu */}
      <button
        onClick={handleJoin}
        className="ml-4 px-4 py-2 bg-blue-500 text-white"
      >
        Katıl
      </button>
    </div>
  );
}
