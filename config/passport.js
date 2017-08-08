const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {

  /**
  * Use random numbers to pick images for the users. 
  * This version returns from min up to and including max (inclusive).
  */
  let avatars = [
    'images/aSheep1.png',
    'images/aSheep2.png',
    'images/aSheep3.png',
    'images/aSheep4.png',
    'images/aSheep5.jpg',
    'images/aSheep6.png'
  ];

  function getRandom(min, max) {
    let myMin = Math.ceil(min);
    let myMax = Math.floor(max);
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
  }


  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) {
    User.findOne({'local.email': email}, function(err, user) {
      console.log('local signup');
      if (err) return callback(err);

      // user already exists
      if (user) {
        return callback(null, false, req.flash('signupMessage', 'This email is already used'));
      } else {
        // new user!
        let newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.makeHash(password);
        newUser.avatar = avatars[getRandom(0, 6)];

        newUser.save(function(err) {
          if (err) throw err;
          return callback(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email': email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });  
  }));

};