import { createClient } from "../supabase/server";

export async function getTableSchema(tableName : string) {
    if (!tableName) throw new Error("tableName is required");

    const supabase = await createClient();
    
    const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type')
    .eq('table_schema', 'public')
    .eq('table_name', tableName);

    if (error) throw new Error(error.message)

    return data;
}