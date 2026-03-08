import { createClient } from "../supabase/server";

export async function insertIntoTable(
  table: string,
  data: Record<string, any>
) {
  if (!table) throw new Error("Table name is required");

  const supabase = await createClient();

  const {
    data: { user },
    } = await supabase.auth.getUser();

    console.log("USER:", user);

  const { data: inserted, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return inserted;
}