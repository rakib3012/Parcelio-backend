import { Router } from "express";
import authController from "../app/controller/authController.js";
import validateRequest from "../app/middleware/validateRequest.js";
import authenticate from "../app/middleware/authenticate.js";
import {
  registrationSchema,
  loginSchema,
} from "../app/validation/authValidation.js";

const authRouter = Router();

// POST /api/v1/auth/register — Create a new user account
authRouter.post(
  "/register",
  validateRequest(registrationSchema),
  authController.register
);

// POST /api/v1/auth/login — Authenticate and receive a token
authRouter.post(
  "/login",
  validateRequest(loginSchema),
  authController.login
);

// GET /api/v1/auth/profile — Get the authenticated user's profile
authRouter.get(
  "/profile",
  authenticate,
  authController.getProfile
);

export default authRouter;
