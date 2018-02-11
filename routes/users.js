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


// router.get('/connect', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.render('userlist', {
//             "userlist" : docs
//         });
//     });
// });

// POST to Add User Service /
router.get('/connect', function(req, res) {
    var id = req.query.id;
    console.log(id)
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    // var userName = req.body.username;
    // var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : id,
        // "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("chat/");
            // name of chatroom to send user to
            res.end("oaieusefh");
        }
    });
});

// GET New User page. /
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
