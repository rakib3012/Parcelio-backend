import mongoose from "mongoose";

const riderApplicationSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    drivingLicenseNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    nidNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    bikeBrandModelYear: {
      type: String,
      required: true,
      trim: true,
    },
    bikeRegistrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    aboutYourself: {
      type: String,
      trim: true,
      default: "",
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
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

const RiderApplication = mongoose.model(
  "RiderApplication",
  riderApplicationSchema
);

export default RiderApplication;
