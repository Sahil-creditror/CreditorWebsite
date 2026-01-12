/**
 * Test Order Creation
 * 
 * This endpoint helps test if orders can be saved to MongoDB
 * 
 * POST /api/test-order
 */

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/api/auth/db/mongodb";
import Order from "@/app/api/auth/models/Order";
import Cart from "@/app/api/auth/models/Cart";

export async function POST(request: NextRequest) {
  try {
    console.log("[test-order] Testing order creation...");
    await connectDB();
    console.log("[test-order] Database connected");

    // Create a test order
    const testOrder = new Order({
      userId: "test_user_" + Date.now(),
      email: "test@example.com",
      tradelines: [
        {
          tradelineId: "tl-test-123",
          tradelineApiId: "test-123",
          bankName: "Test Bank",
          creditLimit: 10000,
          price: 500,
          quantity: 1,
        },
      ],
      billingFirstName: "Test",
      billingLastName: "User",
      billingAddress: "123 Test St",
      billingCity: "Test City",
      billingState: "CA",
      billingZip: "12345",
      billingPhone: "555-1234",
      billingEmail: "test@example.com",
      sameAsBilling: false,
      clientFirstName: "Test",
      clientLastName: "Client",
      clientAddress: "456 Client St",
      clientCity: "Client City",
      clientState: "CA",
      clientZip: "54321",
      clientPhone: "555-5678",
      clientEmail: "client@example.com",
      paymentMethod: "echeck",
      status: "pending",
      subtotal: 500,
      total: 500,
    });

    console.log("[test-order] Saving test order...");
    const savedOrder = await testOrder.save();
    console.log("[test-order] ✅ Order saved! ID:", savedOrder._id);

    // Create a test cart
    const testCart = new Cart({
      userId: "test_user_cart_" + Date.now(),
      email: "testcart@example.com",
      items: [
        {
          tradelineId: "tl-test-456",
          tradelineApiId: "test-456",
          quantity: 1,
          addedAt: new Date(),
        },
      ],
    });

    console.log("[test-order] Saving test cart...");
    const savedCart = await testCart.save();
    console.log("[test-order] ✅ Cart saved! ID:", savedCart._id);

    // Count existing orders and carts
    const orderCount = await Order.countDocuments();
    const cartCount = await Cart.countDocuments();

    return NextResponse.json({
      success: true,
      message: "Test order and cart created successfully",
      orderId: savedOrder._id.toString(),
      cartId: savedCart._id.toString(),
      stats: {
        totalOrders: orderCount,
        totalCarts: cartCount,
      },
    });
  } catch (error: any) {
    console.error("[test-order] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create test order",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const orderCount = await Order.countDocuments();
    const cartCount = await Cart.countDocuments();
    
    // Get sample orders
    const sampleOrders = await Order.find().limit(5).select("-routingNumber -accountNumber -clientSSN").lean();
    const sampleCarts = await Cart.find().limit(5).lean();

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders: orderCount,
        totalCarts: cartCount,
      },
      sampleOrders,
      sampleCarts,
    });
  } catch (error: any) {
    console.error("[test-order] GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
