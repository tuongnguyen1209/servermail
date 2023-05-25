const express = require("express");
const { authChecking, authorization } = require("../midderware/authChecking");
const subjectController = require("../controller/subjectController");

const subjectRouter = express.Router();

subjectRouter
  .route("/")
  .get(authChecking, subjectController.getAll)
  .post(authChecking, authorization("ADMIN"), subjectController.create);

subjectRouter
  .route("/:id")
  .get(authChecking, subjectController.getOne)
  .put(authChecking, authorization("ADMIN"), subjectController.update)
  .delete(authChecking, authorization("ADMIN"), subjectController.delete);

subjectRouter.post(
  '/insertall',
  authChecking,
  authorization("ADMIN"),
  subjectController.createMany
);

module.exports = subjectRouter;
