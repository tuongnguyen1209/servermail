const classesModel = require("../models/classesModel");
const Factory = require("../utils/ApiFactory");
const AppResponse = require("../utils/AppResponse");
const catchAsync = require("../utils/catchAsync");
const userModel = require("../models/userModel");
const subjectsModel = require("../models/subjectsModel");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");
const studentClassModel = require("../models/studentClassModel");
const ApiFeature = require("../utils/ApiFeatures");

exports.getAll = Factory.getAll(classesModel);

exports.edit = Factory.updateOne(classesModel);

exports.delete = Factory.deleteOne(classesModel);

exports.createMany = catchAsync(async (req, res) => {
  res.status(201).json(AppResponse(students));
  const classes = await classesModel.insertMany(doc);

  res.status(201).json(AppResponse(classes));
});

exports.create = catchAsync(async (req, res) => {
  const doc = req.body;
  let rs;

  if (Array.isArray(doc)) {
    const arr = [];
    for (let i = 0; i < doc.length; i++) {
      arr.push(getUserAndSubject(doc[i]));
    }
    const newDoc = await Promise.all(arr);

    rs = await classesModel.insertMany(newDoc);
  } else {
    const classes = await getUserAndSubject(doc);
    rs = await classesModel.create(classes);
  }
  res.status(201).json(AppResponse(rs));
});

exports.getOne = Factory.getOne(classesModel);
// exports.getOne = catchAsync(async (req, res) => {
//   const { id } = req.params;

//   const doc = await classesModel.findById(id).populate({
//     path: "studentClass",

//     options: { getter: false, virtual: false },
//   });
//   res.status(200).json(AppResponse(doc));
// });

const getUserAndSubject = async (doc) => {
  const { user, subject } = doc;
  if (!user || !subject) throw new AppError("Missing user or subject");

  const queryUser = !mongoose.Types.ObjectId.isValid(user)
    ? { email: user }
    : { _id: user };

  const querySubject = !mongoose.Types.ObjectId.isValid(subject)
    ? { subjectID: subject }
    : { _id: subject };

  const rs = await Promise.all([
    userModel.findOne(queryUser),
    subjectsModel.findOne(querySubject),
  ]);

  if (!rs[0]) throw new AppError(`User:'${user}' is not exits`);
  if (!rs[1]) throw new AppError(`Subject:'${subject}' is not exits`);
  doc.user = rs[0]._id;
  doc.subject = rs[1]._id;
  return doc;
};

exports.getMyClass = catchAsync(async (req, res) => {
  const { user } = req;
  if (user) {
    const apiFeature = new ApiFeature(
      classesModel.find({ user: user._id }),
      req.query,
      classesModel.countDocuments()
    )
      .filter()
      .sort()
      .limitFields("-__v");

    const doc = await apiFeature.query;

    res.status(200).json(AppResponse(doc));
  }
});
