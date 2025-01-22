import mongoose from "mongoose";

const booksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
},
{
    timestamps: true,
}
);

export const Book = mongoose.model('Book', booksSchema);