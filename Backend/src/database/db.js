const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        const url = process.env.MONGOOES_URL;
        if (!url) throw new Error('MONGOOES_URL is missing in .env');

        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000,
            family: 4 
        });
        console.log('Database Connected');

    } catch (err) {
        console.error('--- DATABASE CONNECTION ERROR ---');
        console.error('Message:', err.message);
        if (err.message.includes('SSL routines') || err.message.includes('tlsv1 alert internal error')) {
            console.error('DIAGNOSIS: Your IP is likely NOT whitelisted in MongoDB Atlas.');
        }
    }
}


module.exports = connectDB;