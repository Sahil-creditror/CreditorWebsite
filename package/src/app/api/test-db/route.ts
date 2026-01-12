/**
 * Test Database Connection
 * 
 * Endpoint: GET /api/test-db
 * 
 * Tests MongoDB connection and returns status
 */

import { NextResponse } from "next/server";
import connectDB from "@/app/api/auth/db/mongodb";
import User from "@/app/api/auth/models/User";

export async function GET() {
  try {
    // Test connection
    await connectDB();
    
    // Test query
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      connected: true,
      message: "MongoDB connected successfully",
      database: process.env.MONGODB_URI?.split("/").pop() || "unknown",
      userCount,
    });
  } catch (error: any) {
    console.error("[api/test-db] Error:", error);
    return NextResponse.json(
      {
        connected: false,
        error: error.message || "MongoDB connection failed",
        database: process.env.MONGODB_URI || "not configured",
      },
      { status: 500 }
    );
  }
}
