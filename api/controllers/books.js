const express = require('express');
const books = require('../services/books');

/**
 * Returns the list of books
 */
exports.getBooks = async (req, res, next) => {
  const options = {
  };
  try {
    const result = await books.getBooks(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
}

/**
 * Add a book
 */
exports.addBook = async (req, res, next) => {
  const options = {
    book: req.body
  };

  try {
    const result = await books.addBook(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
}

/**
 * Update a book
 */
exports.updateBookById = async (req, res, next) => {
  const options = {
    bookId: req.params.bookId,
    book: req.body
  };

  try {
    const result = await books.updateBookById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
}

/**
 * Get details of a book by its ID
 */
exports.getBookById = async (req, res, next) => {
  const options = {
    bookId: req.params.bookId
  };

  try {
    const result = await books.getBookById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
}

/**
 * Delete a book by its ID
 */
exports.deleteBookById = async (req, res, next) => {
  const options = {
    bookId: req.params.bookId
  };

  try {
    const result = await books.deleteBookById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
}