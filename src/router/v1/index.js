const express = require("express");
const mailCtl = require("../../controller/mailController");

const router = express.Router();

router.route("/sendmail").post(mailCtl.sendmail);

module.exports = router;
