// pages/api/users/verify-token.ts
import jwt from "jsonwebtoken";
import { NextApiResponse, NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      return res.json({ message: "Token verified successfully" });
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
