import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://dev:devpass@127.0.0.1:27017/chatspace?authSource=admin';

(async () => {
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected:', conn.connection.host);
    await mongoose.connection.db.admin().ping();
    console.log('Ping OK');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('DB check failed:', err.message);
    process.exit(1);
  }
})();
