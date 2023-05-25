const studentModel = require("../models/studentModel");
const Factory = require("../utils/ApiFactory");
const AppResponse = require("../utils/AppResponse");
const catchAsync = require("../utils/catchAsync");

exports.getAll = Factory.getAll(studentModel, true);

exports.update = Factory.updateOne(studentModel);

exports.createOne = Factory.createOne(studentModel);

exports.delete = Factory.deleteOne(studentModel);
exports.createMany = catchAsync(async (req, res) => {
  const doc = req.body;
  const students = await studentModel.insertMany(doc);

  res.status(201).json(AppResponse(students));
});

exports.getOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  const student = await studentModel.findById(id);

  res.status(200).json(AppResponse(student));
});
