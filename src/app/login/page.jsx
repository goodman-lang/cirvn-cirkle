"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 Guest (Anonymous) Login
  const handleGuestLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    setLoading(false);
    if (error) setStatus(error.message);
    else {
      setStatus("Welcome! Logging in as Guest...");
      router.push("/dashboard");
    }
  };

  // 🔹 Email Sign-up / Login (Magic Link)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setStatus(error.message);
    else setStatus("Check your email for the magic login link!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Cirkle</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Connect. Reflect. Grow — The Human Side of AI 🤍
        </p>

        {/* Guest Login Button */}
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full mb-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Continue as Guest"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="flex flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Sending magic link..." : "Send Magic Link ✨"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
            {status}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-gray-400">
        Powered by Cirvn Inc — The Human Side of AI
      </footer>
    </div>
  );
}
