import { createClient } from "@supabase/supabase-js";

// Server-side environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Cross-platform Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// Tip tanımlaması
export type FiftyFiftyBlameResult = {
  user1: string;
  user2: string;
  loser: string;
  text: string;
  created_at?: string;
};

export type NumberGuessBlameResult = {
  user1: string;
  user2: string;
  number1: number;
  number2: number;
  target_number: number;
  loser: string;
  text: string;
  created_at?: string;
};

export type AIAnalysisBlameResult = {
  user1: string;
  user2: string;
  story1: string;
  story2: string;
  loser: string;
  text: string;
  created_at?: string;
};
