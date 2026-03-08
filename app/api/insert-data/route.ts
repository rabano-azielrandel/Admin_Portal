import { NextRequest, NextResponse } from "next/server";
import { insertIntoTable } from "@/lib/protected/insertService";

export async function POST(req: NextRequest) {
  try {
    const { table, data } = await req.json();

    const inserted = await insertIntoTable(table, data);

    return NextResponse.json({
      success: true,
      data: inserted,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}