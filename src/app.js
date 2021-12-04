const express = require("express");
const cors = require("cors");
const router = require("./router");

/**
 * configulation app
 */
const app = express();
const PORT = process.env.PORT || 8060;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

/**
 * config router
 */

app.use("/", router);

/**
 * config server
 */

const server = app.listen(PORT, () => {
  console.info(`App run on port: ${PORT} at ${new Date(Date.now())}`);
});
