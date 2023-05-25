const express = require("express");
const userController = require("../controller/userController");
const { authorization, authChecking } = require("../midderware/authChecking");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(authChecking, authorization("ADMIN"), userController.getAll)
  .post(authChecking, authorization("ADMIN"), userController.create);
userRouter
  .route("/:id")
  .get(authChecking, authorization("ADMIN"), userController.getOne)
  .put(authChecking, authorization("ADMIN"), userController.edit)
  .delete(authChecking, authorization("ADMIN"), userController.delete);
userRouter.post(
  "/insertall",

  userController.createMany
);
module.exports = userRouter;
