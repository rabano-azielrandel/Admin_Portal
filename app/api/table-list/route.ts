import { getTableNames } from "@/lib/protected/getTableName"

export async function GET() {
    try {
        const data = await getTableNames();

        const tables = data.map((t: any) => t.table_name);

        return Response.json({tables});
    } catch (error: any) {
        return Response.json({error: error. message}, {status: 500})
    }
}