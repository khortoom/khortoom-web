import { NextRequest, NextResponse } from "next/server";
import { heartbeat } from "@/lib/chroma";

export async function GET() {
  try {
    const res = await heartbeat();

    return NextResponse.json({ heartbeat: res });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
