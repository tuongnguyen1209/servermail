const express = require("express");
const routerV1 = require("./router/v1/");

const router = express.Router();

router.use("/api/v1", routerV1);

module.exports = router;
