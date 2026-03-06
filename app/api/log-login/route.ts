import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/auth/signIn";
import { insertLogs } from "@/lib/protected/logService";

export async function POST(req: NextRequest) {

  const { email, password } = await req.json();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  try{
    // Login auth
    const data= await signIn({ email, password });

    await insertLogs({
      id: data.user?.id ?? null,
      email,
      event_type: "login",
      status : "success",
      ip_address: ip,
      device: "web",
      user_agent: userAgent,
    });

    return NextResponse.json({ user: data.user });
  } catch (err: any) {
      await insertLogs({
        id: null,
        email,
        event_type: "login",
        status: "failed",
        ip_address: ip,
        device: "web",
        user_agent: userAgent,
    });

    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}