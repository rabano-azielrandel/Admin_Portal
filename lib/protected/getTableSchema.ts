import { createClient } from "../supabase/server";

export async function getTableSchema(tableName : string) {
    const supabase = await createClient();
    let table = tableName ? tableName : 'auth_logs';
    

    const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type')
    .eq('table_schema', 'public')
    .eq('table_name', table);

    if (error) throw new Error(error.message)

    return data;
}