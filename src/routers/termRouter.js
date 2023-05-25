const express = require("express");
const termController = require("../controller/termController");
const { authorization, authChecking } = require("../midderware/authChecking");
const termRouter = express.Router();

termRouter
  .route("/")
  .get(authChecking, termController.getAll)
  .post(authChecking, authorization("ADMIN"), termController.create);

termRouter
  .route("/:id")
  .get(authChecking, termController.getOne)
  .put(authChecking, termController.edit)
  .delete(authChecking, authorization("ADMIN"), termController.delete);

module.exports = termRouter;
