import express from "express";
import mongoose from "mongoose";
import { ProfileModel } from "../models/Profiles.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ProfileModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const profile = new ProfileModel(req.body);
  try {
    const response = await profile.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const profile = await ProfileModel.findById(req.body.profileID);
    const user = await UserModel.findById(req.body.userID);
    user.savedProfiles.push(profile);
    await user.save();
    res.json({ savedProfiles: user.savedProfiles });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedProfiles/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedProfiles: user?.savedProfiles });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedProfiles", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);

    const savedProfiles = await ProfileModel.find({
      _id: { $in: user.savedProfiles },
    });
    res.json({ savedProfiles });
  } catch (err) {
    res.json(err);
  }
});

export { router as profilesRouter };
