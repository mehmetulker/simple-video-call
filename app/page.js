// /app/page.jsx

import JoinForm from "../app/components/JoinForm.client";
export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Toplantıya Katıl</h1>
      <JoinForm />
    </div>
  );
}
