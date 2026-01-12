/**
 * Cart API Routes
 * 
 * Endpoints:
 * GET /api/cart - Get user's cart
 * POST /api/cart - Save/update user's cart
 * DELETE /api/cart - Clear user's cart
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/api/auth/db/mongodb";
import Cart from "@/app/api/auth/models/Cart";

/**
 * GET /api/cart
 * Get cart for user
 * 
 * Query params:
 * - userId: User ID (required)
 * - email: User email (optional, for fallback lookup)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    if (!userId && !email) {
      return NextResponse.json(
        { error: "userId or email query parameter is required" },
        { status: 400 }
      );
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (email) {
      cart = await Cart.findOne({ email: email.toLowerCase() });
    }

    if (!cart) {
      return NextResponse.json({
        success: true,
        cart: {
          userId: userId || null,
          email: email || null,
          items: [],
        },
      });
    }

    return NextResponse.json({
      success: true,
      cart: {
        userId: cart.userId,
        email: cart.email,
        items: cart.items,
        updatedAt: cart.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("[api/cart] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch cart",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Save/update user's cart
 */
export async function POST(request: NextRequest) {
  try {
    console.log("[api/cart] POST request received");
    await connectDB();
    console.log("[api/cart] Database connected");

    const body = await request.json();
    console.log("[api/cart] Request body:", {
      userId: body.userId,
      email: body.email,
      itemsCount: body.items?.length || 0,
    });
    const { userId, email, items } = body;

    if (!userId || !email) {
      return NextResponse.json(
        { error: "userId and email are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: "items must be an array" },
        { status: 400 }
      );
    }

    // Find or create cart
    console.log("[api/cart] Looking for existing cart for userId:", userId);
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart
      console.log("[api/cart] Updating existing cart");
      cart.items = items;
      cart.email = email.toLowerCase();
      cart.updatedAt = new Date();
      await cart.save();
      console.log("[api/cart] ✅ Cart updated successfully! ID:", cart._id);
    } else {
      // Create new cart
      console.log("[api/cart] Creating new cart");
      cart = new Cart({
        userId,
        email: email.toLowerCase(),
        items: items.map((item: any) => ({
          ...item,
          addedAt: item.addedAt ? new Date(item.addedAt) : new Date(),
        })),
      });
      await cart.save();
      console.log("[api/cart] ✅ Cart created successfully! ID:", cart._id);
    }

    return NextResponse.json({
      success: true,
      cart: {
        userId: cart.userId,
        email: cart.email,
        items: cart.items,
        updatedAt: cart.updatedAt,
      },
      message: "Cart saved successfully",
    });
  } catch (error: any) {
    console.error("[api/cart] Error saving cart:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save cart",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * Clear user's cart
 * 
 * Query params:
 * - userId: User ID (required)
 */
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    await Cart.deleteOne({ userId });

    return NextResponse.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error: any) {
    console.error("[api/cart] Error clearing cart:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to clear cart",
      },
      { status: 500 }
    );
  }
}
