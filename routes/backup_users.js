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
    // exports.teamlist = function(gname, callback) {  
    
    //Submit to the DB
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
            // res.redirect("chat/" + 1);
            // name of chatroom to send user to
            res.end("oaieusefh");
        }
    });
    // var users = collection.find();
    var users1 = function(users, callback) {
      collection.find({}, {}, function(err, result) {
        if (err) throw err;
        console.log('Running query: ' + JSON.stringify(result));
      });
    };
    var users3 = users1(req.users, function(err, blogs) {
      if (err) { 
         /* panic! there was an error fetching the list of blogs */
         console.log("how to call function")
         return;
      }
      // do something with the blogs here ...
      
    });
    console.log('wattt' + users3)
    users2 = {
      'test' : 1,
      'test2' : 'two'
    };
    console.log('USERS: ' + JSON.stringify(users3));
    console.log(users2)
    // res.redirect('/');
});

// GET New User page. /
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


router.get('/currentusers', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  // var users = collection.find().toArray();
  // if (users.length > 0) { printjson (users[0]); }
  // res.render(users)
  var users = collection.find({},{},function(e,users){
  //     return users;
  // });
      res.render('userlist', {
        'users' : users
      });
  });
  // console.log(JSON.stringify(users));
  // res.render(users);
});

router.get('listusers', function(req, res) {
  var db = req.db;
  const findDocuments = function(db, callback) {
  // Get the documents collection
    const collection = db.get('usercollection');
    // Find some documents
    console.log('running query')
    collection.find({},{}, function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }
  console.log(findDocuments(db))
});

module.exports = router;
