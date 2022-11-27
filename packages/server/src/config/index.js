import dotenv from 'dotenv';
import path from 'path';

const root = process.cwd();
const envFile = dotenv.config({ path: path.join(root, 'src/.env') });

if (!envFile || envFile.error) {
  throw new Error("Couldn't find .env file");
}

const config = {
  port: process.env.PORT || 8080,
  databaseUrl: process.env.DATABASE_URI,
  mode: process.env.NODE_ENV,
  host: process.env.HOST,
  client: process.env.CLIENT_URL
};
export default config;
