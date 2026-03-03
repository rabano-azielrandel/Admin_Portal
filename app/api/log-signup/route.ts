import { NextRequest, NextResponse } from "next/server";
import { signUpWithEmail } from "@/lib/auth/signUp";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    
    const origin = req.nextUrl.origin; 

    const {email, password} = await req.json();

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const {data, error} = await signUpWithEmail(email, password, origin);

    const status = error ? "failed" : "success";

    // Log attempt
    await supabase.rpc("log_auth_event", {
        p_user_id: data?.user?.id ?? null,
        p_email: email,
        p_event_type: "signup",
        p_status: status,
        p_ip_address: ip,
        p_device: "web",
        p_user_agent: userAgent,
    });

    if (error) {
        return NextResponse.json(
        { error: error.message },
        { status: 400 }
        );
    }

  return NextResponse.json({ user: data.user });
}