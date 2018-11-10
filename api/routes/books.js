const booksController = require('../controllers/books');
const express = require('express');
const router = new express.Router();

/**
 * Returns the list of books
 */
router.get('/', booksController.getBooks);

/**
 * Add a book
 */
router.post('/', booksController.addBook);

/**
 * Update a book
 */
router.put('/:bookId', booksController.updateBookById);

/**
 * Get details of a book by its ID
 */
router.get('/:bookId', booksController.getBookById);

/**
 * Delete a book by its ID
 */
router.delete('/:bookId', booksController.deleteBookById);

module.exports = router;
