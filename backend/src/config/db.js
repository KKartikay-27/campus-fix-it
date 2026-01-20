import mongoose from 'mongoose';

// Retry Mongo connection without exiting the process to allow the app to start
const RETRY_DELAY_MS = 5000;
let hasConnectedOnce = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not set. The app will run without a DB connection.');
    return;
  }

  try {
    await mongoose.connect(uri);
    hasConnectedOnce = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    // Do not exit; retry in background
    setTimeout(connectDB, RETRY_DELAY_MS);
    if (!hasConnectedOnce) {
      console.warn('Will keep retrying MongoDB connection in the background.');
    }
  }
};

export default connectDB;
