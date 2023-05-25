const express = require("express");
const studentRouter = express.Router();
const { authorization, authChecking } = require("../midderware/authChecking");
const studentController = require("../controller/studetnController");

studentRouter
  .route("/")
  .get(authChecking, studentController.getAll)
  .post(authChecking, authorization("ADMIN"), studentController.createOne);

studentRouter
  .route("/:id")
  .get(authChecking, studentController.getOne)
  .put(authChecking, authorization("ADMIN"), studentController.update)
  .delete(authChecking, authorization("ADMIN"), studentController.delete);

studentRouter.post(
  "/insertall",
  authChecking,
  authorization("ADMIN"),
  studentController.createMany
);

module.exports = studentRouter;
