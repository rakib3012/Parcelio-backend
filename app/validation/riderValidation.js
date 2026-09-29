import { z } from "zod";

export const riderApplicationSchema = z.object({
  body: z.object({
    applicantName: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name must not exceed 100 characters"),
    drivingLicenseNumber: z
      .string({ required_error: "Driving license number is required" })
      .trim()
      .min(1, "Driving license number is required"),
    emailAddress: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Please provide a valid email address")
      .toLowerCase(),
    region: z
      .string({ required_error: "Region is required" })
      .trim()
      .min(1, "Region is required"),
    district: z
      .string({ required_error: "District is required" })
      .trim()
      .min(1, "District is required"),
    nidNumber: z
      .string({ required_error: "NID number is required" })
      .trim()
      .min(1, "NID number is required"),
    phoneNumber: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number must not exceed 20 characters"),
    bikeBrandModelYear: z
      .string({ required_error: "Bike brand, model and year is required" })
      .trim()
      .min(1, "Bike brand, model and year is required"),
    bikeRegistrationNumber: z
      .string({ required_error: "Bike registration number is required" })
      .trim()
      .min(1, "Bike registration number is required"),
    aboutYourself: z
      .string()
      .trim()
      .max(500, "About yourself must not exceed 500 characters")
      .optional(),
  }),
});
