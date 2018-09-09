var express = require('express');
var router = express.Router();
var { register, login, loginFb } = require('../controllers/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',register)
router.post('/login',login)
router.post('/loginFb', loginFb)

module.exports = router;
