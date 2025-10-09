"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) router.push("/login");
      else setUser(data.user);
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading your Cirkle...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-indigo-700 tracking-tight">
          Cirkle
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {user.is_anonymous ? "Guest User" : user.email}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-1 py-10 px-4">
        {/* Welcome Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-2xl text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hello {user.is_anonymous ? "Friend" : user.email.split("@")[0]} 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Let’s make today meaningful. Track your mood, connect, and grow with
            your AI companion.
          </p>
        </div>

        {/* Mood Snapshot (placeholder for Pulse data) */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-10">
          <h3 className="text-lg font-semibold mb-2">Today’s Mood Summary</h3>
          <p className="text-sm opacity-90">
            Coming soon — your Cirkle Pulse insights will appear here 💫
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
          <button
            onClick={() => router.push("/chat")}
            className="p-4 rounded-xl bg-white/80 shadow hover:shadow-md transition text-indigo-700 font-medium"
          >
            🧠 Cirkle Chat
          </button>
          <button
            onClick={() => router.push("/pulse")}
            className="p-4 rounded-xl bg-white/80 shadow hover:shadow-md transition text-green-700 font-medium"
          >
            ❤️ Cirkle Pulse
          </button>
          <button
            onClick={() => router.push("/beacon")}
            className="p-4 rounded-xl bg-white/80 shadow hover:shadow-md transition text-yellow-700 font-medium"
          >
            🔔 Cirkle Beacon
          </button>
          <button
            onClick={() => router.push("/duo")}
            className="p-4 rounded-xl bg-white/80 shadow hover:shadow-md transition text-purple-700 font-medium"
          >
            🤝 Cirkle Duo
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4">
        Powered by Cirvn Inc — The Human Side of AI
      </footer>
    </div>
  );
}
