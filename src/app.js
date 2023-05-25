/**
 * import module
 */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routers");
const AppError = require("./utils/AppError");
const handlerError = require("./controller/handleError");

/**
 * config variable
 */
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/**
 * router config
 */

app.use("/api/v1/", router);

/**
 *  handler error
 */
app.all("*", (req, res, next) => {
  next(new AppError("Can not find this route on server", 404));
});

app.use(handlerError);

module.exports = app;
