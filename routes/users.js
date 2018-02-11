var express = require('express');
var router = express.Router();
var path = path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/form', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.send('')
})

router.get('/chat', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/chat.html'));
  console.log(path.join(__dirname + '/chat.html'))
  // res.send('')
})


module.exports = router;
