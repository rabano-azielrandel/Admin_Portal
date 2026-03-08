import { getTableSchema } from "@/lib/protected/getTableSchema";


export async function GET(req: Request) {
    const table = await req.json();

    try {
        const data = await getTableSchema(table);
        
        console.log(data);

        return Response.json({data});
    } catch (error: any) {
        return Response.json({error: error.message}, {status: 400})
    }
}