var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'My Website',
    usern: 'Mostafa',
    dt: (new Date()).toString(),
    imgpath: '/images/nutella1.jpg',
    users: [['Mostafa', 1], ['Jim', 4], ['Mark', 10]]
  });
  // res.render('index', { title: 'This is my title' });
});

router.get("/about", (req, res, next) => {
  res.render("about")
})

module.exports = router;
