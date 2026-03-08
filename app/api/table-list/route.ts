import { getTableNames } from "@/lib/protected/getTableName"

export async function GET() {
    try {
        const data = await getTableNames();

        return Response.json({data});
    } catch (error: any) {
        return Response.json({error: error. message}, {status: 500})
    }
}