import dotenv from 'dotenv'

const envFile = dotenv.config({ path: '../.env' });

if (!envFile || envFile.error) {
  throw new Error("Couldn't find .env file");
}

const config = {
  port: process.env.PORT || 8080,
  databaseUrl: process.env.DATABASE_URI,
  mode: process.env.NODE_ENV,
  host: process.env.HOST,
}

export default config  
