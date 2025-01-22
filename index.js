import express from 'express';
import { PORT, DATABASE_URI } from './config.js';
import mongoose from 'mongoose';
import BookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const upload = multer({ dest: 'uploads/' });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//     },
// });
// const upload = multer({ 
//     storage, 
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
// });


const app = express();
// app.use(cors(
//     {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//     }
// ));
app.use(cors());

// const corsOptions = {
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
// };
// app.use(cors(corsOptions));

app.use(express.json());

// Properly resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', BookRoutes);

mongoose
    .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process on fatal connection error
    });


console.log('MongoDB URI:', DATABASE_URI);
console.log('Server Port:', PORT);


