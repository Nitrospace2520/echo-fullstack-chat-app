import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB at port", conn.connection.port);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
