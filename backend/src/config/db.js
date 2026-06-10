const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    if (!config.mongoose || !config.mongoose.url) {
      console.warn('⚠️  MONGODB_URI is not defined in environment configuration. Server will start in MOCK mode (data stored in memory).');
      return;
    }
    
    // Apply global plugin to transform _id to id in JSON
    mongoose.plugin((schema) => {
      schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        }
      });
    });

    // Connect to MongoDB
    await mongoose.connect(config.mongoose.url);
    
    console.log('✅ Connected to MongoDB successfully.');
  } catch (error) {
    console.warn('⚠️  MongoDB Connection Error: Server will continue running in MOCK mode. Error detail:', error.message);
    // Do not call process.exit(1) to allow fallback mock behavior in development
  }
};

module.exports = connectDB;
