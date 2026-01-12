import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Cart Model - Stores user shopping cart items
 * 
 * Cart is stored in MongoDB to sync across devices and persist sessions
 */
export interface ICart extends Document {
  userId: string; // Reference to user
  email: string; // User email for lookup
  items: Array<{
    tradelineId: string; // ID from TradelineSupply API
    tradelineApiId: string; // card_id from API
    quantity: number;
    addedAt: Date;
  }>;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true, // One cart per user
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      index: true,
    },
    items: [
      {
        tradelineId: { type: String, required: true },
        tradelineApiId: { type: String, required: true },
        quantity: { type: Number, default: 1, min: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for faster lookups
CartSchema.index({ userId: 1 });
CartSchema.index({ email: 1 });

// Export the model
const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
