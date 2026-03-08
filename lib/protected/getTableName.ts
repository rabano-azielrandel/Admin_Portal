import { createClient } from "../supabase/server";

export async function getTableNames() {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_public_tables');

    if (error) throw new Error(error.message);

    return data;
}