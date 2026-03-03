import { createClient } from "@/lib/supabase/client";

export async function getAuthLogs() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("weekly_auth_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}