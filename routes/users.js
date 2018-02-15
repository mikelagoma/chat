var express = require('express');
var router = express.Router();
var path = path = require('path');
var mongodb = require('mongodb');

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
        // "time" : time,
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
            console.log('assigning rooms at connect api')
            var a = assignRooms(db);
            res.send(a);
        }
    });
});
//Not sure what I'm doing here
//     // var users = collection.find();
//     var users1 = function(users, callback) {
//       collection.find({}, {}, function(err, result) {
//         if (err) throw err;
//         console.log('Running query: ' + JSON.stringify(result));
//       });
//     };
//     var users3 = users1(req.users, function(err, blogs) {
//       if (err) { 
//          // panic! there was an error fetching the list of blogs 
//          console.log("how to call function")
//          return;
//       }
//       // do something with the blogs here ...
      
//     });
//     console.log('wattt' + users3)
//     users2 = {
//       'test' : 1,
//       'test2' : 'two'
//     };
//     console.log('USERS: ' + JSON.stringify(users3));
//     console.log(users2)
//     // res.redirect('/');
// });

// GET New User page. /
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


router.get('/listusers', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  // var users = collection.find().toArray();
  // if (users.length > 0) { printjson (users[0]); }
  // res.render(users)
  var users = Array()
  collection.find({},{},function(e,docs){
  //     return users;
  // });
      users.push(docs);
      res.render('userlist', {
        'users' : docs
      });
  });
  console.log(JSON.stringify(users));
  // res.render(users);
});

function objectIdWithTimestamp(timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId = mongodb.ObjectId(hexSeconds + "0000000000000000");

    return constructedObjectId
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

router.get('/:id/room', function(req, res) {
  var username = req.params.id;
  var db = req.db;
  var results = Array();
  const findDocuments = function(db, u, callback) {
  // Get the documents collection
    const collection = db.get('usercollection');
    // Find some documents
    console.log('running query')
    console.log(u)
    collection.findOne({ 
        'username': u
      }, function(err, docs) {
      if (err) throw err;
      // console.log("Found the following records");
      res.send(docs);
    });
  }
  findDocuments(db, username)
});

router.get('/assignrooms', function(req, res) {
  var db = req.db;
  console.log('assigning rooms at assignrooms api')
  assignRooms(db);
  res.render('newuser');
});

function assignRooms(db) {
  var results = Array();
  const findDocuments = function(db, callback) {
  // Get the documents collection
    const collection = db.get('usercollection');
    // Find some documents
    console.log('running assign rooms query')
    var t = new Date();
    t.setMinutes(t.getMinutes() - 1);
    console.log(t)
    collection.find({ _id: { 
          $gt: objectIdWithTimestamp(t) 
        }
      }, {}, function(err, docs) {
      if (err) throw err;
      // console.log("Found the following records");
      console.log(docs);
      shuffleArray(docs);
      console.log(docs);
      // roomIds = _.range(docs.length / 2)
      roomIds = [...Array(docs.length).keys()];
      console.log(roomIds)
      for (var i = 0; i < docs.length; i++) {
        var myquery = { username: docs[i].username };
        var newvalues = { $set: {room: roomIds[Math.floor(i/2)] } };
        collection.update(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
        docs[i].room =roomIds[Math.floor(i/2)]
      }
    });
  }
  findDocuments(db)
  var a = 'assignRooms return'
  return a
};


module.exports = router;
