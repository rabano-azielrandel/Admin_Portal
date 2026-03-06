import { sup } from "framer-motion/client";
import { createClient } from "../supabase/server";

export async function executeSelectQuery(query:string, callerId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("execute_select_only", {
        query_text: query,
        caller: callerId,
    });

    if (error) throw new Error(error.message);

    return data;
}
