import { getTopFiveRows } from "@/lib/protected/getFiveRows";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tableName = searchParams.get("tableName");

  if (!tableName) {
    return Response.json(
      { error: "Table name required" },
      { status: 400 }
    );
  }

  try {
    const data = await getTopFiveRows(tableName);

    return Response.json({ data });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}