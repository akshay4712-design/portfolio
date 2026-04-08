import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correct = process.env.CASE_STUDY_PASSWORD ?? "Design@mangeshux";
    return NextResponse.json({ valid: password === correct });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
