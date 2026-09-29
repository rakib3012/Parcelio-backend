import { z } from "zod";

export const registrationSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: "Full name is required" })
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must not exceed 100 characters"),
    emailAddress: z
      .string({ required_error: "Email address is required" })
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password must not exceed 128 characters"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number must not exceed 20 characters")
      .optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    emailAddress: z
      .string({ required_error: "Email address is required" })
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
  }),
});
