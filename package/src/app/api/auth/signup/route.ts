import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userStore } from "../users-store";

// In production, use environment variables
const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    
    console.log("Signup request received:", { name, email, password: password ? "***" : "missing" });

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking if email exists...");
    const emailExists = await userStore.emailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in database
    console.log("Creating user in database...");
    const newUser = await userStore.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    console.log("User created successfully:", { id: newUser._id, email: newUser.email });

    // Return user data (without password)
    const userWithoutPassword = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt.toISOString(),
    };

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    
    // Provide more specific error messages
    if (error.message?.includes("MONGODB_URI")) {
      return NextResponse.json(
        { 
          error: "Database configuration error. Please check MONGODB_URI environment variable.",
          details: error.message 
        },
        { status: 500 }
      );
    }
    
    if (error.message?.includes("already exists")) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }
    
    if (error.name === "MongoServerError" || error.name === "MongooseError") {
      return NextResponse.json(
        { 
          error: "Database connection error. Please check your MongoDB connection.",
          details: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


