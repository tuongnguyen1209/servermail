const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const appResponse = require("../utils/AppResponse");
const userModel = require("../models/userModel");
const JWTFeature = require("../utils/JWTFeatures");

exports.loginWithGoogle = catchAsync(async (req, res) => {
  const { email, fullname, avatar } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      throw new AppError("Have some error, please contact with admin!");
    }
    const jwtfeature = new JWTFeature();
    const token = await jwtfeature.build({
      id: user._id,
    });
    const response = {
      token,
      user,
    };
    res.status(200).json(appResponse(response));
  } catch (err) {
    throw new AppError("Have some error, please contact with admin!");
  }
});

exports.getMyProfile = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(appResponse(user));
  } catch (error) {
    throw new AppError(error.message);
  }
});
