const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SALT: bcrypt.genSaltSync(10),
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  LIVEBLOCK_API_KEY: process.env.LIVEBLOCK_API_KEY
};