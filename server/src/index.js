import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/users.js";
import { profilesRouter } from "./routes/profiles.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://faceshare.vercel.app"],
  methods: "*",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello Face Share Developer!");
});

app.use("/auth", userRouter);
app.use("/profiles", profilesRouter);

const mongo = process.env.MONGODB_URI;

mongoose.connect(mongo);

app.listen(3001, () => console.log("Server Started!"));
