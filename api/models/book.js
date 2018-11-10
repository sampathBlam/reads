// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    type: { type: String, required: false },
    language: { type: String, required: false },
    genre: { type: String, required: false },
    owner: { type: String, required: true },
    status: { type: String, required: true },
    borrower: { type: String, required: false },
    borrowedDate: { type: String, required: false },
    returnedDate: { type: String, required: false },
    wishlist: { type: Array, required: false },
    comments: { type: Array, required: false }
});

BookSchema.virtual('publicObject')
    .get(function () {
        var book = {};
        book._id = this._id;
        book.name = this.name;
        book.author = this.author;
        book.type = this.type;
        book.language = this.language;
        book.genre = this.genre;
        book.owner = this.owner;
        book.status = this.status;
        book.borrower = this.borrower;
        book.borrowedDate = this.borrowedDate;
        book.returnedDate = this.returnedDate;
        book.wishlist = this.wishlist;
        book.comments = this.comments;
        return book;
    })

// Export the Mongoose model
module.exports = mongoose.model('Book', BookSchema);