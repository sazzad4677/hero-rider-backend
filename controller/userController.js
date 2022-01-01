const User = require("../model/User");

const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

// const catchAsyncError = require('catchAsyncError')

// Register a user
exports.registerUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    age,
    phoneNumber,
    password,
    area,
    address,
    vehicleType,
    fee,
    vehicleInfo,
    licenseNumber,
    drivingLicense,
    nid,
    profilePicture,
  } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    age,
    phoneNumber,
    password,
    area,
    address,
    vehicleType,
    fee,
    vehicleInfo,
    licenseNumber,
    drivingLicense,
    nid,
    profilePicture,

    // avatar:{
    //     public_id: '',
    //     url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcloudinary.com%2Fblog%2Ffor_developers_the_html_picture_element_explained&psig=AOvVaw1GhcYUMgJpFtxNgi4ph_B4&ust=1641123987483000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPi_yrS9kPUCFQAAAAAdAAAAABAD'
    // }
  });
  sendToken(user, 200, res);
};

// Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // Checks if data provided
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  // Checked if password is correct
  const isPasswordCorrect = await User.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
};

// Get all user
exports.getAllUser = async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
}