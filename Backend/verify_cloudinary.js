require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('--- Cloudinary Verification ---');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key);

cloudinary.api.ping()
    .then(result => {
        console.log('Ping Result:', result);
        console.log('SUCCESS: Cloudinary is correctly configured!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Ping Failed:', error);
        process.exit(1);
    });
