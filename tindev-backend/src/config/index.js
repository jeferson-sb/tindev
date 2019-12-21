const dotenv = require("dotenv");

const envFile = dotenv.config({ path: "./src/config/.env" });

if (!envFile || envFile.error) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URI
};
