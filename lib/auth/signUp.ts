import { createClient } from "@/lib/supabase/server";

export async function signUpWithEmail(
  email: string,
  password: string,
  origin: string
) {
  const supabase = await createClient();

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/protected`,
    },
  });
}