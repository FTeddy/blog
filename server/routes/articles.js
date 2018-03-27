const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController.js');
const JWT = require('../middleware/jwt.js');
const memupload = require('../middleware/multer.js')
const { googleUpload, googleDelete } = require('../middleware/g-cloud-upload.js')
// /article
router.get('/user/:userId', JWT.authJWT, ArticleController.getArticle);
router.get('/:articleId', JWT.authJWT, ArticleController.getOneArticle);
router.post('/post/:userId', memupload.single('field'), JWT.authJWT, googleUpload, ArticleController.createArticle);
router.put('/edit/:articleId', memupload.single('field'), JWT.authJWT, googleUpload, ArticleController.editArticle);
router.delete('/delete/:articleId', JWT.authJWT, ArticleController.deleteArticle);

module.exports = router;
