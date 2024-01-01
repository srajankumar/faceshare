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

router.put("/:id", async (req, res) => {
  const profileID = req.params.id;
  const updatedData = req.body;

  try {
    // Find the existing profile by ID
    const existingProfile = await ProfileModel.findById(profileID);

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Update the profile data with the new data
    Object.assign(existingProfile, updatedData);

    // Save the updated profile
    const updatedProfile = await existingProfile.save();

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export { router as profilesRouter };
