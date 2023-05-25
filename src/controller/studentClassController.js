const classesModel = require("../models/classesModel");
const studentClassModel = require("../models/studentClassModel");
const Factory = require("../utils/ApiFactory");
const catchAsync = require("../utils/catchAsync");
const studentModel = require("../models/studentModel");
const AppError = require("../utils/AppError");
const AppResponse = require("../utils/AppResponse");
const ApiFeature = require("../utils/ApiFeatures");

exports.getOne = Factory.getOne(studentClassModel);

exports.create = Factory.createOne(studentClassModel);

exports.edit = Factory.updateOne(studentClassModel);

exports.delete = Factory.deleteOne(studentClassModel);

exports.addStudentToClasss = catchAsync(async (req, res) => {
  const { classesID, students } = req.body;

  const array = [];

  let newStudentClass;
  if (Array.isArray(students)) {
    for (let i = 0; i < students.length; i++) {
      array.push(getStudentByStudentID(students[i]));
    }

    const rs = await Promise.all(array);

    const empty = rs.filter((e) => !e.id).map((e) => e.studentID);
    console.log(empty);
    if (empty.length > 0) {
      res.status(500).json({
        status: "error",
        message: "Students is not defind, please add student first",
        students: empty,
      });
    } else {
      const newDoc = rs.map((e) => {
        return {
          student: e.id,
          classes: classesID,
        };
      });
      newStudentClass = await studentClassModel.insertMany(newDoc);
    }
  } else {
    const studentSystem = await getStudentByStudentID(students);

    if (!studentSystem.id)
      throw new AppError(
        `Student with id: ${students} is not defind, please add student first`
      );

    newStudentClass = await studentClassModel.create({
      student: studentSystem.id,
      classes: classesID,
    });
  }
  res.status(201).json(AppResponse(newStudentClass));
});

// exports.getAll = Factory.getAll(studentClassModel);
exports.getAll = catchAsync(async (req, res) => {
  let feature = new ApiFeature(
    studentClassModel.find(),
    req.query,
    studentClassModel.countDocuments()
  )
    .filter()
    .sort()
    .limitFields("-__v ");

  let docs = await feature.query;

  docs = docs.map((e) => {
    const typeScore = e?.classes?.subject?.typeScore;
    // console.log(e.score);
    if (typeScore) {
      const newScore = createEmtpyScore(typeScore.types, e.score);
      e.score = newScore;
    }

    return e;
  });

  res.status(200).json(AppResponse(docs));
});

const createEmtpyScore = (typeScore = [], score = {}) => {
  const newScore = {};
  typeScore.forEach((e) => {
    if (e?.pointPattern?.gradePoint == "ARRAY") {
      const newList = [];
      const pointPatternName = e.pointPattern.name;
      for (let i = 0; i < e.quantity; i++) {
        if (!score[pointPatternName]) {
          newList.push({
            name: `${pointPatternName}${i + 1}`,
            score: null,
          });
          continue;
        }
        const index = score[pointPatternName].findIndex(
          (e) => `${pointPatternName}${i + 1}` == e.name
        );

        if (index == -1) {
          newList.push({
            name: `${pointPatternName}${i + 1}`,
            score: null,
          });
        } else {
          newList.push({
            name: `${pointPatternName}${i + 1}`,
            ...score[pointPatternName][i],
          });
        }
      }
      newScore[e?.pointPattern.name] = newList;
    } else {
      newScore[e?.pointPattern.name] = score[e?.pointPattern.name];
    }
  });

  return newScore;
};

exports.setScores = catchAsync(async (req, res) => {
  const { id } = req.params;

  const doc = req.body;

  const student = await studentClassModel.findById(id);
  if (!student) throw new AppError(`Id: ${id} is not exits`);

  console.log(student?.classes?.subject.typeScore.types);
  const types = student?.classes?.subject.typeScore.types || [];
  const newScore = { ...student.score };
  for (let i = 0; i < types.length; i++) {
    const element = types[i];
    const nameScore = element.pointPattern.name;
    if (!doc[nameScore]) continue;

    if (element.pointPattern.gradePoint === "ARRAY") {
      const newMap = doc[nameScore].map((e) => {
        const key = Object.keys(e);
        const value = Object.values(e);
        return {
          name: key[0],
          score: value[0],
          lastUpdate: new Date(),
        };
      });
      newScore[nameScore] = [...(newScore[nameScore] || []), ...newMap];
    } else if (element.pointPattern.gradePoint === "NUMBER") {
      newScore[nameScore] = doc[nameScore];
    } else {
      newScore[nameScore] = doc[nameScore];
    }
  }
  student.score = newScore;
  await studentClassModel.updateOne(
    { _id: id },
    {
      score: student.score,
    }
  );
  res.status(200).json(AppResponse(student));
});

const getStudentByStudentID = async (studentID) => {
  const student = await studentModel.findOne({
    studentID: studentID,
  });

  return { id: student?._id || null, studentID };
};
