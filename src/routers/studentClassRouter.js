const express = require("express");
const studentClassRouter = express.Router();
const studentClassController = require("../controller/studentClassController");
const { authChecking } = require("../midderware/authChecking");

studentClassRouter
  .route("/")
  .get(authChecking, studentClassController.getAll)
  .post(authChecking, studentClassController.create);

studentClassRouter.post(
  "/addstudent",
  authChecking,
  studentClassController.addStudentToClasss
);

studentClassRouter.put(
  "/setscores/:id",
  authChecking,
  studentClassController.setScores
);

module.exports = studentClassRouter;
