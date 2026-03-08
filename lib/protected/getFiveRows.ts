import { createClient } from "../supabase/server";

export async function getTopFiveRows(tableName : string) {
    if (!tableName) throw new Error ("table name is required!");

    tableName = tableName === 'auth_logs' ? 'weekly_auth_logs' : tableName;

    const supabase = await createClient();

    const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(5);

    if (error) throw new Error(error.message)

    return data;
}