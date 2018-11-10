const Book = require('../models/book');

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getBooks = async (options) => {
  try {
    let books = await Book.find({});
    return {
      status: 200,
      data: books
    };
  } catch (err) {
    throw new Error({
      status: 500, // Or another error code.
      error: err // Or another error message.
    });
  }
};

/**
 * @param {Object} options
 * @param {Object} options.body Book object to be added
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addBook = async (options) => {
  try {
    let newBook = new Book(options.book);
    let addedBook = await newBook.save();
    return {
      status: 200,
      data: addedBook
    };
  } catch (err) {
    throw new Error({
      status: 500, // Or another error code.
      error: err // Or another error message.
    });
  }
};

/**
 * @param {Object} options
 * @param {String} options.bookId Id of the Book to be updated
 * @param {Object} options.body Book object to be updated
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateBookById = async (options) => {
  try {
    let updatedBook = await Book.findOneAndUpdate({ _id: options.bookId }, options.book, { upsert: true, new: true })
    return {
      status: 200,
      data: updatedBook
    };
  } catch (err) {
    throw new Error({
      status: 500, // Or another error code.
      error: err // Or another error message.
    });
  }
};

/**
 * @param {Object} options
 * @param {String} options.bookId Id of the book to be retrieved
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getBookById = async (options) => {
  try {
    let foundBook = await Book.findById(options.bookId)
    return {
      status: 200,
      data: foundBook
    };
  } catch (err) {
    throw new Error({
      status: 500, // Or another error code.
      error: err // Or another error message.
    });
  }
};

/**
 * @param {Object} options
 * @param {String} options.bookId Id of the book to be deleted
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteBookById = async (options) => {
  try {
    let deletedBook = await Book.findOneAndRemove({ _id: options.bookId });
    return {
      status: 200,
      data: deletedBook 
    };
  } catch (err) {
    throw new Error({
      status: 500, // Or another error code.
      error: err // Or another error message.
    });
  }
};

