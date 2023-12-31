import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

const mongo = process.env.MONGODB_URI;

mongoose.connect(mongo);

app.listen(3001, () => console.log("Server Started!"));
