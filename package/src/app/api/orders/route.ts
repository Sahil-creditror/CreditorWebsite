/**
 * Orders API Routes
 * 
 * Endpoints:
 * GET /api/orders - Get orders for current user
 * POST /api/orders - Create new order
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/api/auth/db/mongodb";
import Order from "@/app/api/auth/models/Order";

/**
 * GET /api/orders
 * Get orders for the authenticated user
 * 
 * Query params:
 * - email: Filter by email (optional, requires auth in production)
 * - userId: Filter by user ID (optional)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const userId = searchParams.get("userId");

    let query: any = {};

    if (email) {
      query.email = email.toLowerCase();
    }

    if (userId) {
      query.userId = userId;
    }

    // If no filters, return error (in production, get from authenticated session)
    if (!email && !userId) {
      return NextResponse.json(
        { error: "Email or userId query parameter is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .select("-routingNumber -accountNumber -clientSSN") // Exclude sensitive fields
      .lean();

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error: any) {
    console.error("[api/orders] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    console.log("[api/orders] POST request received");
    await connectDB();
    console.log("[api/orders] Database connected");

    const body = await request.json();
    console.log("[api/orders] Request body received:", {
      userId: body.userId,
      email: body.email,
      tradelinesCount: body.tradelines?.length || 0,
    });

    // Validate required fields
    const requiredFields = [
      "userId",
      "email",
      "tradelines",
      "billingFirstName",
      "billingLastName",
      "billingAddress",
      "billingCity",
      "billingState",
      "billingZip",
      "billingPhone",
      "billingEmail",
      "clientFirstName",
      "clientLastName",
      "clientAddress",
      "clientCity",
      "clientState",
      "clientZip",
      "clientPhone",
      "clientEmail",
      "subtotal",
      "total",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Create order
    console.log("[api/orders] Creating order document...");
    const order = new Order({
      ...body,
      email: body.email.toLowerCase(),
      status: body.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("[api/orders] Saving order to database...");
    const savedOrder = await order.save();
    console.log("[api/orders] ✅ Order saved successfully! ID:", savedOrder._id);

    // Return order without sensitive data
    const orderResponse = savedOrder.toObject();
    delete (orderResponse as any).routingNumber;
    delete (orderResponse as any).accountNumber;
    delete (orderResponse as any).clientSSN;

    return NextResponse.json(
      {
        success: true,
        order: orderResponse,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[api/orders] Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create order",
      },
      { status: 500 }
    );
  }
}
