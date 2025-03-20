/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  let bookId;

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function(done){
  //    chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: "dertogada"})
          .end(function(err, res){
            bookId = res.body._id
            // assert.equal(res.status, 201, "response status should be 201");
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, '_id', 'The Book should contain _id');
            assert.property(res.body, 'title', 'The Book should contain title');
            assert.property(res.body, 'comments', 'The Book should contain comments');
            assert.isArray(res.body.comments, 'The Book\'s comments should be an array');
            assert.equal(res.body.title, "dertogada");
            assert.isEmpty(res.body.comments, "The Book\'s comments should be an Empty array");
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .end(function(err, res){
            // assert.equal(res.status, 400, "response status should be 400");
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200, "response status should be 200");
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get(`/api/books/67a8f29d98060e81a103c438`)
          .end(function(err, res){
            // assert.equal(res.status, 404, "response status should be 404");
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get(`/api/books/${bookId}`)
          .end(function(err, res){
            assert.equal(res.status, 200, "response status should be 200");
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, '_id', 'The Book should contain _id');
            assert.property(res.body, 'title', 'The Book should contain title');
            assert.property(res.body, 'comments', 'The Book should contain comments');
            assert.isArray(res.body.comments, 'The Book\'s comments should be an array');
            // assert.equal(res.body.title, "dertogada");
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post(`/api/books/${bookId}`)
          .send({comment: "This is dertogada"})
          .end(function(err, res){
            assert.equal(res.status, 200, "response status should be 200");
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, '_id', 'The Book should contain _id');
            assert.property(res.body, 'title', 'The Book should contain title');
            assert.property(res.body, 'comments', 'The Book should contain comments');
            assert.isArray(res.body.comments, 'The Book\'s comments should be an array');
            assert.equal(res.body.title, "dertogada");
            assert.include(res.body.comments, "This is dertogada", "The Book\'s comments should contain the string \"This is dertogada\"");
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post(`/api/books/${bookId}`)
          .end(function(err, res){
            // assert.equal(res.status, 400, "response status should be 400");
            assert.equal(res.text, 'missing required field comment');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post('/api/books/67a8f29d98060e81a103c438')
          .send({comment: "This is dertogada"})
          .end(function(err, res){
            // assert.equal(res.status, 404, "response status should be 404");
            assert.equal(res.text, 'no book exists');
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete(`/api/books/${bookId}`)
          .end(function(err, res){
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(res.text, 'delete successful');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete("/api/books/67a8f29d98060e81a103c438")
          .end(function(err, res){
            // assert.equal(res.status, 404, "response status should be 404");
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

  });

});
