import { createClient } from "@/lib/supabase/client";

export async function signUpWithEmail(
    email:string,
    password:string
) {
    const supabase = await createClient();
    
    return supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/protected`
        },
    });
}