import express from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    index,
} from '../controllers/BooksController.js';

import multer from 'multer';

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Set destination folder for uploaded files


const router = express.Router();

// Use multer to handle file upload for 'createBook' and 'updateBook' routes
router.get('/', index);
// router.post('/books', createBook);
router.get('/books', getAllBooks);
router.post('/books', upload.single('image'), createBook); // Handle file upload for creating a book
router.put('/books/:id', upload.single('image'), updateBook); // Handle file upload for updating a book
router.get('/books/:id', getBookById);
// router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
