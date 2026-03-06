import { getLoggedInUser } from "@/lib/auth/getLoggedInUser";
import { executeSelectQuery } from "@/lib/protected/queryExecutor";

export async function POST(req: Request) {
    const { query } = await req.json();

    try {
        // 1️⃣ Get logged-in user
        const user = await getLoggedInUser();
        if (!user) return Response.json({ error: 'Not authenticated' }, { status: 401 });
 
        // 2️⃣ Delegate to business logic
        const data = await executeSelectQuery(query, user.id);

        // For debugging only
        console.log(data);

        return Response.json({data});
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 400 });
    }
}