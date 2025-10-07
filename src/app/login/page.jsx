"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Guest (Anonymous) Login
  const handleGuestLogin = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) setStatus(error.message);
    else setStatus("Guest login successful!");
  };

  // 🔹 Email Sign-up / Login (Magic Link)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setStatus(error.message);
    else setStatus("Check your email for the magic login link!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Cirvn Cirkle</h1>

      <button
        onClick={handleGuestLogin}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Continue as Guest
      </button>

      <form onSubmit={handleEmailLogin} className="w-full max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Send Magic Link
        </button>
      </form>

      {status && <p className="mt-4 text-gray-600">{status}</p>}
    </div>
  );
}
