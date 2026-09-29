import { Router } from "express";
import riderController from "../app/controller/riderController.js";
import validateRequest from "../app/middleware/validateRequest.js";
import { riderApplicationSchema } from "../app/validation/riderValidation.js";

const riderRouter = Router();

// POST /api/v1/rider/apply — Submit a rider application
riderRouter.post(
  "/apply",
  validateRequest(riderApplicationSchema),
  riderController.submitApplication
);

export default riderRouter;
