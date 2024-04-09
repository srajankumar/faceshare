import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://srajankumar:zoro123@cluster0.ixjwkbo.mongodb.net/profiles?retryWrites=true&w=majority"
    );
    console.log("mongodb connected successfully.");
  } catch (err) {
    throw new Error("Error connecting to mongodb.");
  }
};

export default connect;
