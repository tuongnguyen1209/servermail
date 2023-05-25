const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/config.env` });

const uri = process.env.DATABASE_STRING.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

exports.connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => {
      console.log("Connect database sucessfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
