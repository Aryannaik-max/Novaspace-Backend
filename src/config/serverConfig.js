const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  
  // Authentication
  SALT: bcrypt.genSaltSync(10),
  JWT_SECRET: process.env.JWT_SECRET,
  
  // Cloudinary (File Storage)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  
  // Liveblocks (Real-time Collaboration)
  LIVEBLOCK_API_KEY: process.env.LIVEBLOCK_API_KEY,
  
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL
};