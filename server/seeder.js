import mongoose from "mongoose";
import { connectToDatabase } from "./db.js";
import "dotenv/config.js";
import User from "./models/User.js";

async function seedData() {
  await connectToDatabase();
  await User.deleteMany();
  const admin = await User.create({
    name: "Admin",
    email: "admin@admin.de",
    password: "aDmin123!",
    role: "admin",
  });
  await mongoose.connection.close();
}
seedData();
