import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../utilities/logger';

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
    logger.info('MongoDB Connected: ', conn.connection.host);
  } catch (error) {
    logger.error('Database connection Error: ', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
