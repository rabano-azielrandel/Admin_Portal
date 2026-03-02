import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { email, password } = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  const userAgent = req.headers.get("user-agent") ?? "unknown";

  // Login auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const status = error ? "failed" : "success";

  // Log regardless of success or failure
  await supabase.rpc("log_auth_event", {
    p_user_id: data?.user?.id ?? null,
    p_email: email,
    p_event_type: "login",
    p_status: status,
    p_ip_address: ip,
    p_device: "web",
    p_user_agent: userAgent,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }

  return NextResponse.json({ user: data.user });
}