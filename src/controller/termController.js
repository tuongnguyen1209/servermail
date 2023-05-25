const termModel = require("../models/termModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const ApiFeature = require("../utils/ApiFeatures");
const AppResponse = require("../utils/AppResponse");
const Factory = require("../utils/ApiFactory");

exports.getAll = catchAsync(async (req, res) => {
  try {
    const termsFeature = new ApiFeature(
      termModel.find(),
      req.query,
      termModel.countDocuments()
    )
      .filter()
      .sort()
      .paginate()
      .limitFields("-__v ");

    const terms = await termsFeature.query;

    res.status(200).json(AppResponse(terms));
  } catch (error) {
    throw new AppError(error.message);
  }
});

exports.getOne = Factory.getOne(termModel);

exports.create = catchAsync(async (req, res) => {
  try {
    console.log(req.body);

    const newTerm = await termModel.create(req.body);

    res.status(201).json(AppResponse(newTerm));
  } catch (error) {
    throw new AppError(error.message);
  }
});

exports.edit = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    await termModel.updateOne({ _id: id }, req.body);
    const term = await termModel.findById(id);

    res.status(200).json(AppResponse(term));
  } catch (error) {
    throw new AppError(error.message);
  }
});

exports.delete = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const term = await termModel.findByIdAndDelete(id);

    res.status(204).json(AppResponse(term));
  } catch (error) {
    throw new AppError(error.message);
  }
});
