import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const { query } = await req.json();

    const supabase = await createClient();

    // 1️⃣ Get logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });

    // 2️⃣ Call the RPC with query + caller ID
    const { data, error } = await supabase.rpc("execute_select_only", {
        query_text: query,
        caller: user.id,
    });

    if (error) {
        return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ data });
}