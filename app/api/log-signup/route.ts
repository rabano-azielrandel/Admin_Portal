import { NextRequest, NextResponse } from "next/server";
import { signUpWithEmail } from "@/lib/auth/signUp";
import { insertLogs } from "@/lib/protected/logService";

export async function POST(req: NextRequest) {
    const {email, password} = await req.json();
    const origin = req.nextUrl.origin; 

    

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";   
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const {data, error} = await signUpWithEmail(email, password, origin);

    const status = error ? "failed" : "success";

    // Log attempt
    await insertLogs({
      id: data?.user?.id ?? null,
      email,
      event_type: "signup",
      status,
      ip_address: ip,
      device: "web",
      user_agent: userAgent,
    });

    if (error) {
        return NextResponse.json(
        { error: error.message },
        { status: 400 }
        );
    }

  return NextResponse.json({ user: data.user });
}