const subjectsModel = require("../models/subjectsModel");
const Factory = require("../utils/ApiFactory");
const AppResponse = require("../utils/AppResponse");
const catchAsync = require("../utils/catchAsync");

exports.getAll = Factory.getAll(subjectsModel);

exports.getOne = Factory.getOne(subjectsModel);

exports.update = Factory.updateOne(subjectsModel);

exports.create = Factory.createOne(subjectsModel);

exports.createMany = catchAsync(async (req, res) => {
  const all = req.body;
  const subjects = await subjectsModel.insertMany(all);

  res.status(201).json(AppResponse(subjects));
});

exports.delete = Factory.deleteOne(subjectsModel);
