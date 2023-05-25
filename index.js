const dotenv = require("dotenv");
const app = require("./src/app");
const database = require("./src/config/databaseConfig");

const PORT = process.env.PORT || 3066;

dotenv.config({ path: `${__dirname}/src/config/config.env` });

// database.connect();

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}`);
});
