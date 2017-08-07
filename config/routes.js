let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');  // used to manipulate POST methods
let passport = require("passport");
let staticsController = require('../controllers/statics');
let usersController = require('../controllers/users');
let apisController = require('../controllers/apis');


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



router.route('/api/user')
  .get(apisController.apiUser);

router.route('/api/user/stash')
  .post(apisController.apiNewStash);

router.route('/api/user/weather')
  .get(apisController.apiUserWeather);



router.route('/api')
  .get(apisController.apiDoc);

router.route('/api/breed')
  .get(apisController.apiIndex);

router.route('/api/breed/all')
  .get(apisController.apiShowAll);

router.route('/api/breed/:name')
  .get(apisController.apiShow);

router.route('/api/breed')
  .post(apisController.apiNew);

router.route('/api/breed/:name')
  .put(apisController.apiUpdate);

router.route('/api/breed/:name')
  .delete(apisController.apiDelete);


module.exports = router;
