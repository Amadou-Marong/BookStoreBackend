// books controller

import { Book } from '../models/booksModel.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
// index
export const index = (req, res) => {
    res.send('Hello from the books controller');
}

// Controller for creating a book
export const createBook = async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;
        const image = req.file ? `uploads/${req.file.filename}` : null; // Handle image upload

        if (!title || !author || !publishedYear) {
            return res.status(400).send({ message: 'Please fill all the required fields' });
        }

        const newBook = await Book.create({ title, author, image, publishedYear });

        return res.status(201).send({
            message: 'Book saved successfully',
            data: newBook,
        });
    } catch (error) {
        console.error("Error saving book:", error.message);
        return res.status(500).send({ message: 'Error in saving book' });
    }
};

// Controller for fetching all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books:", error.message);
        return res.status(500).send({ message: 'Error in fetching books' });
    }
};

// Controller for fetching a single book by ID
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book:", error.message);
        return res.status(500).send({ message: 'Error in fetching book' });
    }
};

// Controller for updating a book by ID
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        const { title, author, publishedYear } = req.body;
        const image = req.file ? `uploads/${req.file.filename}` : book.image; // Preserve old image if no new one

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title: title || book.title, author: author || book.author, image: image || book.image, publishedYear: publishedYear || book.publishedYear },
            { new: true }
        );

        return res.status(200).send({
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        console.error("Error updating book:", error.message);
        return res.status(500).send({ message: 'Error in updating book' });
    }
};

// Controller for deleting a book by ID
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: 'Book not found' });
        }

        await Book.findByIdAndDelete(id);

        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error("Error deleting book:", error.message);
        return res.status(500).send({ message: 'Error in deleting book' });
    }
};
