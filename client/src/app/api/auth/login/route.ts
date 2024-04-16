// pages/api/users/login.ts
import connectMongoDB from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/Users";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();
  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Username or password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    return res.json({ token, userID: user._id });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
