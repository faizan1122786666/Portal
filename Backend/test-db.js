import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URL = process.env.MONGOOES_URL || process.env.MONGO_URL;

console.log('--- Database Connection Diagnostic ---');
console.log('Time:', new Date().toLocaleString());
console.log('Target URL:', MONGO_URL ? MONGO_URL.replace(/:([^@]+)@/, ':****@') : 'MISSING');

if (!MONGO_URL) {
  console.error('❌ Error: MONGOOES_URL is not defined in .env');
  process.exit(1);
}

const options = {
  serverSelectionTimeoutMS: 5000,
  family: 4, // Force IPv4
};

console.log('Attempting to connect...');

mongoose.connect(MONGO_URL, options)
  .then(() => {
    console.log('✅ Success: Database Connected Successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Failed!');
    console.error('Error Name:', err.name);
    console.error('Error Code:', err.code);
    console.error('Reason:', err.reason ? JSON.stringify(err.reason, null, 2) : 'No specific reason provided');
    
    if (err.message.includes('SSL') || err.message.includes('alert number 80')) {
      console.log('\n--- DIAGNOSIS: IP WHITELIST ISSUE ---');
      console.log('This specific SSL alert (80) usually means MongoDB Atlas rejected the connection');
      console.log('because your current IP address is not whitelisted in the Network Access tab.');
    }
    
    process.exit(1);
  });
