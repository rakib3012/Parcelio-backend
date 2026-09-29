import RiderApplication from "../models/RiderApplicationModel.js";
import AppError from "../utility/AppError.js";

const submitApplication = async (applicationData) => {
  const {
    applicantName,
    drivingLicenseNumber,
    emailAddress,
    region,
    district,
    nidNumber,
    phoneNumber,
    bikeBrandModelYear,
    bikeRegistrationNumber,
    aboutYourself,
  } = applicationData;

  // Check if an application with the same email already exists
  const existingByEmail = await RiderApplication.findOne({
    emailAddress,
  }).lean();

  if (existingByEmail) {
    throw new AppError(
      "A rider application with this email already exists.",
      409
    );
  }

  // Check if an application with the same NID already exists
  const existingByNid = await RiderApplication.findOne({ nidNumber }).lean();

  if (existingByNid) {
    throw new AppError(
      "A rider application with this NID number already exists.",
      409
    );
  }

  // Check if an application with the same driving license already exists
  const existingByLicense = await RiderApplication.findOne({
    drivingLicenseNumber,
  }).lean();

  if (existingByLicense) {
    throw new AppError(
      "A rider application with this driving license already exists.",
      409
    );
  }

  const newApplication = await RiderApplication.create({
    applicantName,
    drivingLicenseNumber,
    emailAddress,
    region,
    district,
    nidNumber,
    phoneNumber,
    bikeBrandModelYear,
    bikeRegistrationNumber,
    aboutYourself: aboutYourself || "",
  });

  return newApplication;
};

export default {
  submitApplication,
};
