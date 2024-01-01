import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: { type: String },
  bio: { type: String },
  links: [{ type: String }],
  imageUrl: { type: String },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const ProfileModel = mongoose.model("profiles", ProfileSchema);
