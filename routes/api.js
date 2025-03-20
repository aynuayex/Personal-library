/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const Book = require("../models/book");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async (req, res) => {
      const books = await Book.find({});
      // console.log({ books });
      if (!books) {
        res.json([]);
        return;
      }
      const formattedBooks = books.map((book) => {
        const { _id, title, comments, ...restProperties } = book;
        return {
          _id,
          title,
          commentcount: comments.length,
        };
      });
      res.json(formattedBooks);
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) {
        res.send("missing required field title");
        return;
      }
      const book = await Book.create({
        title,
      });
      // console.log({bookid: book._id})
      res.json(book);
      //response will contain new book object including atleast _id and title
    })

    .delete(async function (req, res) {
      await Book.deleteMany();
      res.send("complete delete successful");
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      const book = await Book.findOne({ _id: bookid }).exec();
      if (!book) {
        res.send("no book exists");
        return;
      }
      res.json(book);
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send("missing required field comment");
        return;
      }
      const book = await Book.findByIdAndUpdate(
        bookid,
        {
          $push: { comments: comment },
        },
        { new: true }
      );
      if (!book) {
        return res.send("no book exists");
      }
      res.json(book);
      //json res format same as .get
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      const book = await Book.findByIdAndDelete(bookid);
      if (!book) {
        return res.send("no book exists");
      }
      res.send("delete successful");
      //if successful response will be 'delete successful'
    });
};
