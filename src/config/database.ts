/* eslint-disable no-console */
import mongoose, { ConnectOptions } from 'mongoose';

/**
 * ConnectDB() is an async function that uses mongoose.connect() to connect to the MongoDB database
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      } as ConnectOptions
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    console.log(process.env.MONGO_URI as string);
    process.exit(1);
  }
};

export default connectDB;
