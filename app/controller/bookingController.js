import * as bookingService from "../service/bookingService.js";

export const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: "Parcel booked successfully",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

export const trackBooking = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const booking = await bookingService.getBookingByTrackingId(trackingId);

    return res.status(200).json({
      success: true,
      message: "Parcel tracking info retrieved successfully",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getMyBookings(req.user.identifier);

    return res.status(200).json({
      success: true,
      message: "User bookings retrieved successfully",
      data: { bookings },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const result = await bookingService.getAllBookings(req.query);

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.updateBookingStatus(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};
