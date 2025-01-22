// export const PORT = 5555;
// // export const MONGO_URI = 'mongodb://localhost:27017/bookStore';
// export const MONGO_URI = 'mongodb+srv://root:1234@cluster-1.txhym.mongodb.net/BookStore';


import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
