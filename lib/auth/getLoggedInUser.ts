import { createClient } from "../supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getLoggedInUser(): Promise<User | null> {
    const supabase = await createClient();

    const {data: {user}, error} = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error.message);
    return null;
    }
    
    return user || null;
}





