import { NextResponse } from "next/server";

import { userRouter } from "./routes/users.js";
import { profilesRouter } from "./routes/profiles.js";

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}
