import connectMongoDB from "@/lib/db";
import { ProfileModel } from "@/models/Profiles";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await connectMongoDB();
  try {
    const response = await ProfileModel.find({});
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
