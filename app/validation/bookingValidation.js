import { z } from "zod";

const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;

export const createBookingSchema = z.object({
  body: z.object({
    parcelType: z.enum(["document", "not-document"], {
      required_error: "Parcel type is required",
      invalid_type_error: "Parcel type must be either 'document' or 'not-document'",
    }),
    parcelName: z
      .string({ required_error: "Parcel name is required" })
      .trim()
      .min(2, "Parcel name must be at least 2 characters long")
      .max(100, "Parcel name cannot exceed 100 characters"),
    parcelWeight: z.coerce
      .number({ required_error: "Parcel weight is required" })
      .positive("Parcel weight must be a positive number"),

    // Sender details
    senderName: z
      .string({ required_error: "Sender name is required" })
      .trim()
      .min(2, "Sender name must be at least 2 characters long")
      .max(100, "Sender name cannot exceed 100 characters"),
    senderAddress: z
      .string({ required_error: "Sender address is required" })
      .trim()
      .min(5, "Sender full address must be at least 5 characters long"),
    senderPhone: z
      .string({ required_error: "Sender phone number is required" })
      .trim()
      .regex(
        bangladeshPhoneRegex,
        "Please provide a valid Bangladeshi phone number (e.g. 01712345678)"
      ),
    senderDistrict: z
      .string({ required_error: "Sender district is required" })
      .trim()
      .min(1, "Sender district is required"),
    pickupInstruction: z
      .string()
      .trim()
      .max(300, "Pickup instruction must not exceed 300 characters")
      .optional()
      .default(""),

    // Receiver details
    receiverName: z
      .string({ required_error: "Receiver name is required" })
      .trim()
      .min(2, "Receiver name must be at least 2 characters long")
      .max(100, "Receiver name cannot exceed 100 characters"),
    receiverAddress: z
      .string({ required_error: "Receiver address is required" })
      .trim()
      .min(5, "Receiver address must be at least 5 characters long"),
    receiverPhone: z
      .string({ required_error: "Receiver phone number is required" })
      .trim()
      .regex(
        bangladeshPhoneRegex,
        "Please provide a valid Bangladeshi phone number (e.g. 01812345678)"
      ),
    receiverDistrict: z
      .string({ required_error: "Receiver district is required" })
      .trim()
      .min(1, "Receiver district is required"),
    deliveryInstruction: z
      .string()
      .trim()
      .max(300, "Delivery instruction must not exceed 300 characters")
      .optional()
      .default(""),

    paymentMethod: z
      .enum(["cash_on_delivery", "online", "bkash", "nagad"])
      .optional()
      .default("cash_on_delivery"),
  }),
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "pending",
      "accepted",
      "in_transit",
      "delivered",
      "cancelled",
    ], {
      required_error: "Status is required",
    }),
    note: z.string().trim().max(200).optional(),
    paymentStatus: z
      .enum(["pending", "paid", "cancelled"])
      .optional(),
  }),
});
