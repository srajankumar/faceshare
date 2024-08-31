import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

import { userRouter } from "./routes/users.js";
import { profilesRouter } from "./routes/profiles.js";

const app = express();

const corsOptions = {
  origin: [process.env.DEV_CLIENT, process.env.PROD_CLIENT],
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

app.listen(PORT, () => console.log("Server Started at " + PORT));
