'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Yeni stream'i listeye ekle
        setStreams((prev) => [...prev, stream]);
      } catch (err) {
        console.error('Kamera erişimi reddedildi:', err);
      }
    }

    startCamera();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Canlı Kullanıcı Görüntüleri</h1>

      {/* Kendi kameran */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Kendi Kameralarım</h2>
        <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '300px', border: '1px solid #ccc' }} />
      </div>

      {/* Diğer kullanıcılar (şu an boş, sadece örnek) */}
      <div>
        <h2>Diğer Kullanıcılar</h2>
        {streams.length > 1 ? (
          streams.slice(1).map((stream, index) => (
            <video
              key={index}
              srcObject={stream}
              autoPlay
              playsInline
              style={{ width: '300px', margin: '5px', border: '1px solid #ccc' }}
            />
          ))
        ) : (
          <p>Henüz başka kullanıcı yok.</p>
        )}
      </div>
    </div>
  );
}