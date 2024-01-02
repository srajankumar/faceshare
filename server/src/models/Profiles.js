import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: { type: String },
  bio: { type: String },
  links: [{ type: String }],
  imageUrl: { type: String },
});

export const ProfileModel = mongoose.model("profiles", ProfileSchema);
