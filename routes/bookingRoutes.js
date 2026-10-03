import { Router } from "express";
import {
  createBooking,
  trackBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../app/controller/bookingController.js";
import validateRequest from "../app/middleware/validateRequest.js";
import authenticate from "../app/middleware/authenticate.js";
import optionalAuthenticate from "../app/middleware/optionalAuthenticate.js";
import authorize from "../app/middleware/authorize.js";
import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "../app/validation/bookingValidation.js";

const bookingRouter = Router();

// POST /api/v1/bookings — Create a new parcel booking (guest or authenticated)
bookingRouter.post(
  "/",
  optionalAuthenticate,
  validateRequest(createBookingSchema),
  createBooking
);

// GET /api/v1/bookings/track/:trackingId — Public parcel tracking by tracking ID
bookingRouter.get("/track/:trackingId", trackBooking);

// GET /api/v1/bookings/my-bookings — Get bookings for the authenticated user
bookingRouter.get(
  "/my-bookings",
  authenticate,
  getMyBookings
);

// GET /api/v1/bookings — List all bookings (Admin & Rider only)
bookingRouter.get(
  "/",
  authenticate,
  authorize("admin", "rider"),
  getAllBookings
);

// PATCH /api/v1/bookings/:id/status — Update booking status (Admin & Rider only)
bookingRouter.patch(
  "/:id/status",
  authenticate,
  authorize("admin", "rider"),
  validateRequest(updateBookingStatusSchema),
  updateBookingStatus
);

export default bookingRouter;
