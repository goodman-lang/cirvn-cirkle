"use client";
import { createBrowserClient } from "@supabase/ssr";

let supabase;

if (typeof window !== "undefined") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
