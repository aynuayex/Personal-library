/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models/book")

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      const books = await Book.find({})
      console.log({books})
      res.json(books)
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if(!title) {
        res.json({error: "missing required field title"})
      }
      const book = await Book.create({
        title
      })
      res.json(book)
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
