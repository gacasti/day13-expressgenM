var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// endpoint: /users/profile
router.get('/profile', function (req, res, next) {
  res.render('profile', {
    username: "Mostafa",
    userid: 10,
    email: "mostafa@server.com",
    password: "*****"
  });
});

module.exports = router;
