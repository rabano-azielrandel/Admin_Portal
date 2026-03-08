import { createClient } from "../supabase/server";

export async function getTableSchema(tableName : string) {
    if (!tableName) throw new Error("tableName is required");

    const supabase = await createClient();
    
    const { data, error } = await supabase.rpc("get_table_schema", {p_table_name: tableName});

    if (error) throw new Error(error.message)

    return data;
}