import { NextResponse } from "next/server";
import connect from "../../../../db";
import { ProfileModel } from "../../../../models/Profiles.js";

export async function GET() {
  try {
    await connect();
    const profiles = await ProfileModel.find({});
    return new NextResponse(JSON.stringify(profiles), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching profiles" + error, {
      status: 500,
    });
  }
}
