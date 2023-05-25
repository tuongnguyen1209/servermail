const express = require("express");
const classRouter = express.Router();
const classesController = require("../controller/classesController");
const { authChecking, authorization } = require("../midderware/authChecking");
const authRouter = require("./authRouter");

classRouter
  .route("/")
  .get(authChecking, authorization("ADMIN"), classesController.getAll)
  .post(authChecking, authorization("ADMIN"), classesController.create);

classRouter.get(
  "/myclass",
  authChecking,
  authorization("USER"),
  classesController.getMyClass
);
classRouter
  .route("/:id")
  .get(authChecking, classesController.getOne)
  .put(authChecking, authorization("ADMIN"), classesController.edit)
  .delete(authChecking, authorization("ADMIN"), classesController.delete);

classRouter.post(
  "/insertall",
  authChecking,
  authorization("ADMIN"),
  classesController.createMany
);

module.exports = classRouter;
