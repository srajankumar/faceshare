import express from "express";
import mongoose from "mongoose";
import { ProfileModel } from "../models/Profiles.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ProfileModel.find({});
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const profile = new ProfileModel(req.body);
  try {
    const response = await profile.save();
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const profileID = req.params.id;
  const updatedData = req.body;

  try {
    const existingProfile = await ProfileModel.findById(profileID);

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (updatedData.name) {
      existingProfile.name = updatedData.name;
    }

    if (updatedData.bio) {
      existingProfile.bio = updatedData.bio;
    }

    if (updatedData.imageUrl) {
      existingProfile.imageUrl = updatedData.imageUrl;
    }

    if (updatedData.links && Array.isArray(updatedData.links)) {
      existingProfile.links = updatedData.links;
    }

    // for changing username (feature)

    // if (updatedData.username) {
    //   existingProfile.username = updatedData.username;
    // }

    const updatedProfile = await existingProfile.save();

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const profile = await ProfileModel.findById(req.body.profileID);
    const user = await UserModel.findById(req.body.userID);

    if (!profile || !user) {
      return res.status(404).json({ error: "Profile or User not found" });
    }

    user.savedProfiles.push(profile);
    await user.save();

    res.json({ savedProfiles: user.savedProfiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/savedProfiles/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedProfiles: user?.savedProfiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/savedProfiles/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedProfiles = await ProfileModel.find({
      _id: { $in: user.savedProfiles },
    });
    res.json({ savedProfiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router as profilesRouter };
