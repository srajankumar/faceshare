// pages/api/users/register.ts
import connectMongoDB from "@/lib/db";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/Users";
import { NextApiResponse, NextApiRequest } from "next";

import { ProfileModel } from "@/models/Profiles";
import { NextResponse, NextRequest } from "next/server";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  await connectMongoDB();

  const requestBody = req.body as unknown as RequestBody;
  if (!requestBody) {
    return NextResponse.json({ message: "Invalid request body!" });
  }

  const { username, password } = requestBody;
  const user = await UserModel.findOne({ username });

  if (user) {
    return NextResponse.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User registered successfully!" });
}
