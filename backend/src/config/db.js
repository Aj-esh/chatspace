import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('MONGO_URI is not set');
  if (isConnected) return mongoose;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    console.log('MongoDB connected:', mongoose.connection.host);
    return mongoose;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

export async function disconnectDB() {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}