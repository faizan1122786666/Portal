require('dotenv').config();
console.log('CLOUDINARY_URL:', JSON.stringify(process.env.CLOUDINARY_URL));
const cloudinary = require('cloudinary').v2;
console.log('Cloudinary Config:', cloudinary.config());
