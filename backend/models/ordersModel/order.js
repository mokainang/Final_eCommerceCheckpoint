// Define the schema of our collections

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    reference: {
      trxref: String,
      trans: String,
      status: String,
      message: String,
      redirecturl: String,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Orders", orderSchema);

export { orderModel };
