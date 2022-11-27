import config from './index.js'
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${config.databaseUrl}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
