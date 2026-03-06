const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('--- Cloudinary Diagnostic ---');
console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API_KEY (First 4):', process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.substring(0, 4) + '...' : 'MISSING');
console.log('CONFIGURED API_KEY:', cloudinary.config().api_key);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'employee_portal_profiles',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
