const UserModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const JWTFeature = require("../utils/JWTFeatures");

exports.authChecking = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("Please login and try again!", 401));
  const jwtfeature = new JWTFeature();
  const decode = await jwtfeature.decore(token);

  if (!decode)
    return next(new AppError("Token expired, please login and try again", 401));

  const currentuser = await UserModel.findOne({ _id: decode.id });
  if (!currentuser) {
    return next(new AppError("Token error, please login and try again", 401));
  }

  req.user = currentuser;
  next();
};

exports.authorization =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError("you do not have access to this router!", 403));
    }
    next();
  };
