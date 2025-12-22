// MongoDB-based user store for authentication
import connectDB from "./db/mongodb";
import User, { IUser } from "./models/User";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export const userStore = {
  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      await connectDB();
      const user = await User.findOne({ email: email.toLowerCase() });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  // Find user by ID
  async findById(id: string): Promise<IUser | null> {
    try {
      await connectDB();
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error;
    }
  },

  // Create new user
  async create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    try {
      console.log("Connecting to DB to create user...");
      await connectDB();
      console.log("DB connected, creating user model...");
      const user = new User({
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password,
        createdAt: new Date(),
      });
      console.log("Saving user to database...");
      const savedUser = await user.save();
      console.log("User saved successfully:", savedUser._id);
      return savedUser;
    } catch (error: any) {
      // Handle duplicate key error (email already exists)
      if (error.code === 11000) {
        throw new Error("User with this email already exists");
      }
      console.error("Error creating user:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });
      throw error;
    }
  },

  // Get all users (for admin purposes, remove in production)
  async getAll(): Promise<IUser[]> {
    try {
      await connectDB();
      const users = await User.find().select("-password"); // Exclude passwords
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  },

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    try {
      console.log("Connecting to DB to check email...");
      await connectDB();
      console.log("DB connected, searching for user...");
      const user = await User.findOne({ email: email.toLowerCase() });
      console.log("Email check result:", !!user);
      return !!user;
    } catch (error: any) {
      console.error("Error checking email existence:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });
      throw error;
    }
  },
};

