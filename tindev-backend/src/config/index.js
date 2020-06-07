const dotenv = require('dotenv');

const envFile = dotenv.config({ path: './src/config/.env' });

if (!envFile || envFile.error) {
  throw new Error("Couldn't find .env file");
}

let databaseUrl = process.env.DATABASE_URI;
if (process.env.NODE_ENV === 'development') {
  databaseUrl = 'mongodb://localhost:27017/tindev';
}

module.exports = {
  port: process.env.PORT,
  databaseUrl,
  mode: process.env.NODE_ENV,
};
