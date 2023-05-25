const User = require("../models/userModel");
const Factory = require("../utils/ApiFactory");
const AppResponse = require("../utils/AppResponse");
const catchAsync = require("../utils/catchAsync");

exports.getAll = Factory.getAll(User);

exports.getOne = Factory.getOne(User);

exports.create = Factory.createOne(User);

exports.edit = Factory.updateOne(User);

exports.delete = Factory.deleteOne(User);

exports.createMany = catchAsync(async (req, res) => {
  const doc = req.body;
  console.log(doc);
  const Users = await User.insertMany(doc);

  res.status(201).json(AppResponse(Users));
});
