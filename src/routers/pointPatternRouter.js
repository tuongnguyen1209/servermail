const express = require("express");
const pointPatternRouter = express.Router();
const pointPatternController = require("../controller/pointPatternController");
const { authChecking, authorization } = require("../midderware/authChecking");

pointPatternRouter
  .route("/")
  .get(authChecking, authorization("ADMIN"), pointPatternController.getAll)
  .post(authChecking, authorization("ADMIN"), pointPatternController.create);

pointPatternRouter
  .route("/:id")
  .get(authChecking, authorization("ADMIN"), pointPatternController.getOne)
  .put(authChecking, authorization("ADMIN"), pointPatternController.edit)
  .delete(authChecking, authorization("ADMIN"), pointPatternController.delete);
module.exports = pointPatternRouter;
