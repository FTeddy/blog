const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const should = chai.should();
chai.use(chaiHttp);

const app = 'http://localhost:3000'
const userId = '5aaf9b5f370e3561bdcb9074'
const articleId = '5aafa10cb3fb5067a15095f2                '
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjE0MDk4NzkzNjc3NTQ3IiwibmFtZSI6IkZyYW5zaXNrdXMgVGVkZHkiLCJlbWFpbCI6ImFpbnNvcGhvdXJlQHlhaG9vLmNvbSIsImdlbmRlciI6Im1hbGUiLCJwaWN0dXJlIjp7ImRhdGEiOnsiaGVpZ2h0IjoxNjAsImlzX3NpbGhvdWV0dGUiOmZhbHNlLCJ1cmwiOiJodHRwczovL3Njb250ZW50Lnh4LmZiY2RuLm5ldC92L3QxLjAtMS9jMC4zMC4xNjAuMTYwL3AxNjB4MTYwLzE5MjAxNDlfMTAyMDI1MzI3MDEyNTI0NjVfMTI4MzQyODMwM19uLmpwZz9vaD02YzM3OWUxNjEzNTFjY2VmYjE0MWJjZDUwNWI2OWRmNiZvZT01QjM1QjZCNyIsIndpZHRoIjoxNjB9fSwiaWF0IjoxNTIxNDU3MzU0fQ.wSnLk3l3iZ3xWrPH5QVeP-jsdb-11gbR7OHkYM4CR4g'


// res.body.message
// res.body.datas

// TEST ONE BY ONE
describe('API /article', () => {

  // describe('GET /article/user/:userId', () => {
  //   it('should return all users recent articles, limit 10', (done) => {
  //     chai.request(app)
  //       .get(`/article/user/${userId}`)
  //       .set('token', jwtToken)
  //       .end(function (err, res) {
  //         console.log(res.body);
  //          should.not.exist(err);
  //          res.should.have.status(200);
  //          should.exist(res);
  //          res.body.should.be.an('object');
  //          res.body.should.have.property('message');
  //          res.body.should.have.property('articles');
  //          res.body.message.should.be.a('string');
  //          res.body.articles.should.have.lengthOf.below(11);
  //          done()
  //
  //          // status should be 200
  //          // data should be an object
  //          // data should have property message
  //          // data.message should be a string
  //          // data should have property articles
  //          // data.articles should have lengthof below 11
  //       });
  //   })
  // })

  // describe('POST /article/post/:userId', () => {
  //   it('should send article data as users, data should match, default should exist', (done) => {
  //     let send = {
  //       title : 'PH Title',
  //       text : 'lorem ipsum stuff over here',
  //     };
  //     chai.request(app)
  //       .post(`/article/post/${userId}`)
  //       .type('form')
  //       .set('token', jwtToken)
  //       // .attach('field', fs.readFileSync('test.png'), 'test.png')
  //       .send(send)
  //       .end(function (err, res) {
  //         console.log(res.body);
  //         // console.log(res.headers);
  //         should.not.exist(err);
  //         should.exist(res);
  //         res.should.have.status(201);
  //         res.body.should.be.an('object');
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('newArticle');
  //         res.body.message.should.be.a('string');
  //         res.body.newArticle.should.be.an('object');
  //         res.body.newArticle.should.have.property('title');
  //         res.body.newArticle.should.have.property('text');
  //         res.body.newArticle.should.have.property('imgUrl');
  //         res.body.newArticle.title.should.be.equal(send.title)
  //         res.body.newArticle.text.should.be.equal(send.text)
  //         res.body.newArticle.userId.should.be.equal(userId)
  //         done()
  //       });
  //
  //       // status should be 201
  //       // data should be an object
  //   })
  // })

  // describe('PUT /article/edit/:articleId', () => {
  //   it('data send should match output sent by server', (done) => {
  //     let update = {
  //       title : 'PH Title updated',
  //       text : 'lorem ipsum stuff over here',
  //     };
  //     // let articleId = '';
  //     chai.request(app)
  //       .put(`/article/edit/${articleId}`)
  //       .type('form')
  //       .set('token', jwtToken)
  //       // .attach('field', fs.readFileSync('test.png'), 'test.png')
  //       .send(update)
  //       .end(function (err, res) {
  //         console.log(res.body);
  //          should.not.exist(err);
  //          res.should.have.status(200);
  //          should.exist(res);
  //          res.body.should.be.an('object');
  //          res.body.should.have.property('message');
  //          res.body.should.have.property('updatedArticle');
  //          res.body.message.should.be.a('string');
  //          res.body.updatedArticle.should.be.an('object');
  //          res.body.updatedArticle.should.have.property('title');
  //          res.body.updatedArticle.should.have.property('text');
  //          res.body.updatedArticle.should.have.property('imgUrl');
  //          res.body.updatedArticle.title.should.be.equal(update.title)
  //          res.body.updatedArticle.text.should.be.equal(update.text)
  //          done()
  //       });
  //   })
  // })

  // describe('DELETE /article/delete/:articleId', () => {
  //   it('data send should match output sent by server', (done) => {
  //     let articleDelete = '5ab035eb4680f70e76f5a351'
  //     // let userIdB = '5aaf98cacb0b0f606ecfeff1'
  //     chai.request(app)
  //       .delete(`/article/delete/${articleDelete}`)
  //       .set('token', jwtToken)
  //       .end(function (err, res) {
  //         console.log(res.body);
  //          should.not.exist(err);
  //          res.should.have.status(200);
  //          should.exist(res);
  //          res.should.be.an('object');
  //          res.body.should.have.property('message');
  //          res.body.message.should.be.a('string');
  //          res.body.should.have.property('deletedArticle');
  //          res.body.deletedArticle._id.should.be.equal(articleDelete)
  //          done()
  //       });
  //   })
  // })

})

//
// describe('API /user', () => {
//
//   describe('GET /user', () => {
//
//   })
//
//   describe('POST /user/post', () => {
//
//   })
//
//   describe('PUT /user/edit', () => {
//
//   })
//
//   describe('DELETE /user/delete', () => {
//
//   })
//
// })
