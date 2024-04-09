import mongoose from "mongoose";

const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI || "";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("mongodb connected successfully.");
  } catch (err) {
    throw new Error("Error connecting to mongodb.");
  }
};

export default connect;
