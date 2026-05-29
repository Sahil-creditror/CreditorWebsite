/**
 * Admin API Route - View All Users
 * 
 * ⚠️ WARNING: This is for development/testing only!
 * Remove or protect with authentication in production.
 * 
 * Endpoint: GET /api/admin/users
 * 
 * Returns all users (without passwords)
 */

import { NextRequest, NextResponse } from "next/server";
import { userStore } from "@/app/api/auth/users-store";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // ⚠️ TODO: Add authentication check here for production
    // const user = await getAuthenticatedUser(request);
    // if (!user || !user.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const users = await userStore.getAll();
    
    // Return users without passwords
    const usersWithoutPasswords = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      count: usersWithoutPasswords.length,
      users: usersWithoutPasswords,
    });
  } catch (error: any) {
    console.error("[api/admin/users] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}
