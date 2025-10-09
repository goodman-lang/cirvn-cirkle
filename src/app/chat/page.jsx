"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CirkleChat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hey there 👋 I'm your Cirkle Duo. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // 🧠 Verify user session
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) router.push("/login");
      else setUser(data.user);
    };
    getUser();
  }, [router]);

  // 👁️ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 💬 Handle send
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Mock AI reply (later connect to API)
    setTimeout(() => {
      const aiMessage = {
        sender: "ai",
        text:
          "That’s interesting. I’d love to hear more about how that makes you feel 💫",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <p className="text-lg text-gray-600 animate-pulse">Connecting to your Cirkle...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* Header */}
      <header className="flex justify-between items-center p-5 shadow-sm bg-white/70 backdrop-blur-md">
        <h1 className="text-xl font-bold text-indigo-700">Cirkle Chat</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-gray-600 hover:text-indigo-700"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white/80 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 p-4 border-t bg-white/70 backdrop-blur-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
