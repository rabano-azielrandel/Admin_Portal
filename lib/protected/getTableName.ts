import { createClient } from "../supabase/server";

export async function getTableNames() {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('information_schema.tables')
    .select('*')
    .eq('table_schema', 'public')
    .eq('table_type', 'BASE TABLE');

    if (error) throw new Error(error.message);

    return data;
}