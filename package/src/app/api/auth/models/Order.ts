import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Order Model - Stores tradeline purchase orders
 * 
 * All tradeline orders are stored in MongoDB for permanent record keeping
 */
export interface IOrder extends Document {
  userId: string; // Reference to user
  email: string; // User email for lookup
  tradelines: Array<{
    tradelineId: string; // ID from TradelineSupply API
    tradelineApiId: string; // card_id from API
    bankName: string;
    creditLimit: number;
    price: number;
    quantity: number;
  }>;
  
  // Billing Details
  billingFirstName: string;
  billingLastName: string;
  companyName?: string;
  billingAddress: string;
  billingAddress2?: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingPhone: string;
  billingEmail: string;
  
  // Authorized User Info
  sameAsBilling: boolean;
  clientFirstName: string;
  clientLastName: string;
  clientAddress: string;
  clientAddress2?: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientPhone: string;
  clientEmail: string;
  clientDOB?: Date;
  clientSSN?: string; // Encrypted in production
  
  // Payment Details
  routingNumber?: string; // Encrypted
  accountNumber?: string; // Encrypted
  paymentMethod: string;
  
  // Document Uploads (file paths or S3 keys)
  billingDLPath?: string;
  clientDLPath?: string;
  clientSSNCardPath?: string;
  
  // Order Status
  status: "pending" | "in_review" | "processing" | "completed" | "cancelled";
  
  // Totals
  subtotal: number;
  total: number;
  
  // Additional Info
  orderNotes?: string;
  creditGoal?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      index: true, // For faster lookups
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      index: true, // For faster lookups by email
    },
    tradelines: [
      {
        tradelineId: { type: String, required: true },
        tradelineApiId: { type: String, required: true }, // card_id
        bankName: { type: String, required: true },
        creditLimit: { type: Number, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    
    // Billing Details
    billingFirstName: { type: String, required: true },
    billingLastName: { type: String, required: true },
    companyName: { type: String },
    billingAddress: { type: String, required: true },
    billingAddress2: { type: String },
    billingCity: { type: String, required: true },
    billingState: { type: String, required: true },
    billingZip: { type: String, required: true },
    billingPhone: { type: String, required: true },
    billingEmail: { type: String, required: true },
    
    // Authorized User Info
    sameAsBilling: { type: Boolean, default: false },
    clientFirstName: { type: String, required: true },
    clientLastName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientAddress2: { type: String },
    clientCity: { type: String, required: true },
    clientState: { type: String, required: true },
    clientZip: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientDOB: { type: Date },
    clientSSN: { type: String }, // TODO: Encrypt this in production
    
    // Payment Details
    routingNumber: { type: String }, // TODO: Encrypt this
    accountNumber: { type: String }, // TODO: Encrypt this
    paymentMethod: { type: String, default: "echeck" },
    
    // Document Paths
    billingDLPath: { type: String },
    clientDLPath: { type: String },
    clientSSNCardPath: { type: String },
    
    // Order Status
    status: {
      type: String,
      enum: ["pending", "in_review", "processing", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    
    // Totals
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    
    // Additional Info
    orderNotes: { type: String },
    creditGoal: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create indexes for faster queries
OrderSchema.index({ userId: 1, createdAt: -1 }); // User's orders by date
OrderSchema.index({ email: 1, createdAt: -1 }); // Orders by email
OrderSchema.index({ status: 1 }); // Orders by status

// Export the model
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
