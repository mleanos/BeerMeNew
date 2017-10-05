var express = require('express');
var router = express.Router();

var expressValidator = require('express-validator');
var passport = require('passport');

var bcrypt = require('bcrypt');
const saltRounds = 10;
var models = require('../models');

var multer = require('multer');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('home', { title: 'Home' });
});

router.get('/profile', authenticationMiddleware(), function(req, res) {
  res.render('profile', { title: 'Profile' });
});

router.get('/breweries', authenticationMiddleware(), function(req, res) {
  res.render('breweries', { title: 'Search Breweries' });
});

router.get('/beerme', authenticationMiddleware(), function(req, res) {
  res.render('beerme', { title: 'Beer Me!' });
});

router.get('/search', authenticationMiddleware(), function(req, res) {
  res.render('search', { title: 'Search Beers' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/')
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });

});
// get users info from database
    // router.get("/api/userdata", function(req, res) {
    //   const db = require('../db.js');
    //   console.log("the user"+ JSON.stringify(req.user));
    //     db.query("SELECT * FROM users WHERE username=?", ["texast9018"], function(err, data) {
    //         if (err) {
    //             throw err;
    //         }
    //         else {
    //             console.log(data);
    //         }
    //
    //         res.json(data);
    //     });
    // });
// post beers
    router.post("/api/beers", function(req, res) {
      const db = require('../db.js');
      const { beername } = req.body;
      const theUser = req.user.user_id;
      var newBeer = {
            beername: beername,
        }
        db.query("INSERT INTO beers (beername, user) VALUES (?, ?)", [newBeer.beername, theUser], function(err, res) {
          if(err) throw err;
        });
      });
// post breweries
    router.post("/api/breweries", function(req, res) {
      console.log("brewinfo "+ req.body);
      const { brewery} = req.body;
      var newBrew = {
            breweryname: brewery,
        }
        connection.query("INSERT INTO breweries (breweryname, username) VALUES (?, ?)", [newBrew.breweryname, newBrew.username], function(err, res) {
          if(err) throw err;
        });
      });
// post favorites
    router.post("/api/favorites", function(req, res) {
     console.log("beerInfo "+ req.body);
     const { beername, username } = req.body;

     var newFav = {
           favorites: beername,
           theuser: user,
       }
       connection.query("INSERT INTO favorites (favorites, theuser) VALUES (?, ?)", [newFav.favorites, newFav.theuser], function(err, res) {
         if(err) throw err;
       });
     });
// get favorites
     router.get("/api/favorites", function(req, res) {
        connection.query("SELECT * FROM favorites WHERE id=?", [req.user.user_id], function(err, data) {
            if (err) {
                throw err;
            }
            else {
                console.log(data);
            }

            res.json(data);
            });
        });
// get breweries
      router.get("/api/breweries", function(req, res) {
        db.query("SELECT * FROM breweries WHERE id=?", [req.user.user_id], function(err, data) {
            if (err) {
                throw err;
            }
            else {
                console.log(data);
            }
            res.json(data);
            });
        });
// get users info from database
      router.get("/api/userdata", function(req, res) {
        // const db = require('../db.js');
        // console.log('models: ', models);
        models.User.findOne({ where: { id: req.user.user_id } })
          .then(user => {
            console.log('found user from model findOne!');
            console.log('user: ', user);
            res.json(user);
          })
          .catch(err => {
            console.log('err in User.findOne!');
            console.log(err);
            res.status(400).send({
              message: err.message
            });
          });
        /*
        db.query("SELECT * FROM users WHERE id=?", [req.user.user_id], function(err, data) {
            if (err) {
                throw err;
            }
            else {
              console.log('found user!!');
              console.log(data);
            }
            res.json(data);
        });
        */
      });
// get beerdata
      router.get("/api/beers", function(req, res) {
        const db = require('../db.js');
          db.query("SELECT * FROM beers WHERE id=?", [req.user.user_id], function(err, data) {
              if (err) {
                  throw err;
              }
              else {
                  console.log(data);
              }
              res.json(data);
              });
          });
// post registration
router.post('/register', function(req, res, next) {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
      res.render('register', {
        title:'Registration Error',
        errors: errors
      });
  } else{
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      console.log(req.body.username);
      console.log(req.body.email);
      console.log(req.body.password);
      const db = require('../db.js');


      bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(
        error, results, fields){
          if (error) throw error;
          db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
            if (error) throw error;

            const user_id = results[0];
            console.log(results[0]);
            req.login(user_id, function(err){
              res.redirect('/');
            })
            res.render('register', { title: 'Registration Complete' });
          })
        })
      });
    }
      });

// POST upload profile image
router.post('/api/upload/user-profile-image', function (req, res) {
  var upload = multer({
    dest: './public/uploads/profile/images',
    limits: { fileSize: 1000000 }
  }).single('profileImage');

  // Upload file
  upload(req, res, function (uploadError) {
    if (uploadError) {
      console.log('upload error: ', uploadError);
      return res.status(400).send({
        message: 'Upload Failed!'
      });
    }

    console.log('file: ', req.file);
    console.log('filepage: ', req.file.path);

    var profileImageUrl = 'uploads/profile/images/' + req.file.filename;

    // find user by req.user.user_id
    models.User.update({ profileImageUrl: profileImageUrl }, { where: { id: req.user.user_id } })
      .then(user => {
        // user update
        console.log('updated user: ', user);

        res.json(user);
      })
      .catch(err => {
        // user find error send back response
        return res.status(400).send({
          message: err.message
        });
      });
  });
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
     done(null, user_id);
});

function authenticationMiddleware () {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
