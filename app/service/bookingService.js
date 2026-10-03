import Booking from "../models/BookingModel.js";
import AppError from "../utility/AppError.js";

/**
 * Calculate dynamic delivery charge based on parcel type, weight, and delivery route
 */
export const calculateDeliveryCharge = ({
  parcelType,
  parcelWeight,
  senderDistrict,
  receiverDistrict,
}) => {
  const weight = parseFloat(parcelWeight) || 0;
  const isSameDistrict =
    senderDistrict &&
    receiverDistrict &&
    senderDistrict.trim().toLowerCase() === receiverDistrict.trim().toLowerCase();

  let charge = 0;
  if (parcelType === "document") {
    charge = isSameDistrict ? 60 : 100;
    if (weight > 1) {
      charge += Math.ceil(weight - 1) * 20;
    }
  } else {
    // non-document
    charge = isSameDistrict ? 80 : 130;
    if (weight > 1) {
      charge += Math.ceil(weight - 1) * 30;
    }
  }

  return charge;
};

/**
 * Generate a unique tracking code (e.g. PRCL-728192)
 */
const generateUniqueTrackingId = async () => {
  let isUnique = false;
  let trackingId = "";

  while (!isUnique) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    trackingId = `PRCL-${randomDigits}`;

    const existing = await Booking.findOne({ trackingId }).lean();
    if (!existing) {
      isUnique = true;
    }
  }

  return trackingId;
};

/**
 * Create a new parcel booking
 */
export const createBooking = async (bookingData, user = null) => {
  const {
    parcelType,
    parcelName,
    parcelWeight,
    senderName,
    senderAddress,
    senderPhone,
    senderDistrict,
    pickupInstruction,
    receiverName,
    receiverAddress,
    receiverPhone,
    receiverDistrict,
    deliveryInstruction,
    paymentMethod = "cash_on_delivery",
  } = bookingData;

  // Calculate authoritative delivery charge on server
  const deliveryCharge = calculateDeliveryCharge({
    parcelType,
    parcelWeight,
    senderDistrict,
    receiverDistrict,
  });

  const trackingId = await generateUniqueTrackingId();

  const newBooking = await Booking.create({
    trackingId,
    userId: user?.identifier || null,
    parcelType,
    parcelName,
    parcelWeight,
    senderName,
    senderAddress,
    senderPhone,
    senderDistrict,
    pickupInstruction: pickupInstruction || "",
    receiverName,
    receiverAddress,
    receiverPhone,
    receiverDistrict,
    deliveryInstruction: deliveryInstruction || "",
    deliveryCharge,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod,
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
        note: "Parcel booking submitted successfully",
      },
    ],
  });

  return newBooking;
};

/**
 * Get booking details by tracking ID (public tracking)
 */
export const getBookingByTrackingId = async (trackingId) => {
  const normalizedId = trackingId?.trim().toUpperCase();

  const booking = await Booking.findOne({ trackingId: normalizedId })
    .populate("userId", "fullName emailAddress phone")
    .lean();

  if (!booking) {
    throw new AppError(`No parcel found with tracking code: ${trackingId}`, 404);
  }

  return booking;
};

/**
 * Get all bookings for the currently authenticated user
 */
export const getMyBookings = async (userId) => {
  const bookings = await Booking.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return bookings;
};

/**
 * Get all bookings (with optional filters, for Admin / Rider)
 */
export const getAllBookings = async (query = {}) => {
  const { status, district, page = 1, limit = 20 } = query;
  const filter = {};

  if (status) {
    filter.status = status;
  }
  if (district) {
    filter.$or = [{ senderDistrict: district }, { receiverDistrict: district }];
  }

  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Booking.countDocuments(filter),
  ]);

  return {
    bookings,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * Update parcel status and history
 */
export const updateBookingStatus = async (idOrTrackingId, { status, note, paymentStatus }) => {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrTrackingId);
  const query = isObjectId ? { _id: idOrTrackingId } : { trackingId: idOrTrackingId.toUpperCase() };

  const booking = await Booking.findOne(query);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  booking.status = status;
  if (paymentStatus) {
    booking.paymentStatus = paymentStatus;
  }

  booking.statusHistory.push({
    status,
    timestamp: new Date(),
    note: note || `Parcel status updated to ${status}`,
  });

  await booking.save();
  return booking;
};
