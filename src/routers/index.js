const express = require("express");
const authRouter = require("./authRouter");
// const scoreTypeRouter = require("./scoreTypeRouter");
const studentRouter = require("./studentRouter");
const subjectRouter = require("./subjectRouter");
const termRouter = require("./termRouter");
const studentClassRouter = require("./studentClassRouter");

const classesRouter = require("./classesRouter");
const typeScoreRouter = require("./typeScoreRouter");
const userRouter = require("./userRouter");
const pointPatternRouter = require("./pointPatternRouter");

const router = express.Router();

router.use("/term", termRouter);

router.use("/auth", authRouter);

// router.use("/typescore", scoreTypeRouter);

router.use("/student", studentRouter);

router.use("/subject", subjectRouter);

router.use("/studentclass", studentClassRouter);

router.use("/classes", classesRouter);

router.use("/user", userRouter);

router.use("/pointPattern", pointPatternRouter);

router.use("/typeScore", typeScoreRouter);

module.exports = router;
