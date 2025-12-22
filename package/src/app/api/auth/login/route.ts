import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userStore } from "../users-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await userStore.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data (without password)
    const userWithoutPassword = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    
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

