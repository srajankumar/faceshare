import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  savedProfiles: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedProfiles: [{ type: Schema.Types.ObjectId, ref: "profiles" }],
});

export const UserModel = mongoose.model<IUser>("users", UserSchema);
