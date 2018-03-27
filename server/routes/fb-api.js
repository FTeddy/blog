const express = require('express');
const router = express.Router();
const JWT = require('../middleware/jwt.js');
// const TokenController = require('../controllers/token.js')
const UserController = require('../controllers/UserController.js');

/* GET home page. */

router.post('/facebook', JWT.getJWT, UserController.tokenToClient)

module.exports = router;
