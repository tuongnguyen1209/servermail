const express = require("express");
const typeScoreRouter = express.Router();
const typeScoreController = require("../controller/typeScoreController");
const { authChecking, authorization } = require("../midderware/authChecking");

typeScoreRouter
  .route("/")
  .get(authChecking, authorization("ADMIN"), typeScoreController.getAll)
  .post(authChecking, authorization("ADMIN"), typeScoreController.create);

typeScoreRouter
  .route("/:id")
  .get(authChecking, authorization("ADMIN"), typeScoreController.getOne)
  .put(authChecking, authorization("ADMIN"), typeScoreController.edit)
  .delete(authChecking, authorization("ADMIN"), typeScoreController.delete);
module.exports = typeScoreRouter;
