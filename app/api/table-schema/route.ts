import { getTableSchema } from "@/lib/protected/getTableSchema";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table");

  if (!table) {
    return Response.json({ error: "Table name required" }, { status: 400 });
  }

  try {
    const data = await getTableSchema(table);

    return Response.json(data);
  } catch (error: any) {
    return Response.json( { error: error.message }, { status: 400 } );
  }
}