import mongoose from "mongoose";
import { config } from "dotenv";
import User from "../models/User";
import bcrypt from "bcrypt";

config();

const users = [
  {
    fullName: "Test User",
    email: "testuser@gmail.com",
    password: "123456",
    chats: []
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);

    // Hash passwords before inserting users
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Clear existing users
    await User.deleteMany({});

    // Insert new users
    await User.insertMany(users);

    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
