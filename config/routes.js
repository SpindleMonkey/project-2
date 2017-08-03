var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');  // used to manipulate POST methods
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');


// function authenticatedUser(req, res, next) {
//   // if the user is authenticated, we continue execution
//   if (req.isAuthenticated()) return next();

//   // otherwise the request is redirected to the home page
//   res.redirect('/');
// }

router.route('/')
  .get(staticsController.home);

router.route('/inventory')
  .get(staticsController.inventory);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route('/logout')
  .get(usersController.getLogout);

// router.route('/secret')
//   .get(authenticatedUser, usersController.secret);

module.exports = router;
