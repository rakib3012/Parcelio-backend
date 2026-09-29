import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import config from "../config/index.js";
import AppError from "../utility/AppError.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

const registerUser = async (registrationData) => {
  const { fullName, emailAddress, password, phone } = registrationData;

  const existingUser = await User.findOne({ emailAddress }).lean();

  if (existingUser) {
    throw new AppError("An account with this email address already exists.", 409);
  }

  const newUser = await User.create({
    fullName,
    emailAddress,
    password,
    phone: phone || "",
  });

  const token = generateToken(newUser._id);

  const userProfile = {
    identifier: newUser._id,
    fullName: newUser.fullName,
    emailAddress: newUser.emailAddress,
    role: newUser.role,
  };

  return { userProfile, token };
};

const loginUser = async (loginData) => {
  const { emailAddress, password } = loginData;

  // Select password explicitly since it's select:false in the schema
  const foundUser = await User.findOne({ emailAddress }).select("+password");

  if (!foundUser) {
    throw new AppError("Invalid email address or password.", 401);
  }

  const isPasswordCorrect = await foundUser.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email address or password.", 401);
  }

  const token = generateToken(foundUser._id);

  const userProfile = {
    identifier: foundUser._id,
    fullName: foundUser.fullName,
    emailAddress: foundUser.emailAddress,
    role: foundUser.role,
  };

  return { userProfile, token };
};

const getAuthenticatedUserProfile = async (userId) => {
  const foundUser = await User.findById(userId).lean();

  if (!foundUser) {
    throw new AppError("User not found.", 404);
  }

  return {
    identifier: foundUser._id,
    fullName: foundUser.fullName,
    emailAddress: foundUser.emailAddress,
    role: foundUser.role,
  };
};

export default {
  registerUser,
  loginUser,
  getAuthenticatedUserProfile,
};
