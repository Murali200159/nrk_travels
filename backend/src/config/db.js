const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    if (!config.mongoose || !config.mongoose.url) {
      throw new Error('MONGODB_URI is not defined in environment configuration.');
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
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
