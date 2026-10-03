import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "in_transit", "delivered", "cancelled"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    parcelType: {
      type: String,
      required: true,
      enum: ["document", "not-document"],
    },
    parcelName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    parcelWeight: {
      type: Number,
      required: true,
      min: 0.01,
    },
    // Sender Information
    senderName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    senderAddress: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    senderPhone: {
      type: String,
      required: true,
      trim: true,
    },
    senderDistrict: {
      type: String,
      required: true,
      trim: true,
    },
    pickupInstruction: {
      type: String,
      trim: true,
      default: "",
    },
    // Receiver Information
    receiverName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    receiverAddress: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    receiverPhone: {
      type: String,
      required: true,
      trim: true,
    },
    receiverDistrict: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryInstruction: {
      type: String,
      trim: true,
      default: "",
    },
    // Pricing and Delivery
    deliveryCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in_transit", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "online", "bkash", "nagad"],
      default: "cash_on_delivery",
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: () => [
        {
          status: "pending",
          timestamp: new Date(),
          note: "Parcel booking requested",
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, returnedObject) {
        returnedObject.identifier = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
