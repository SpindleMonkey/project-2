const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use EJS for pages
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

let db = require('./models');


/**********
 * ROUTES *
 **********/

app.use(session({ secret: 'SuperTopSecretStashyThing', resave: true, saveUninitialized: true } )); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

let routes = require('./config/routes');
app.use(routes);


/**********
 * SERVER *
 **********/

// listen on port 3000 if running locally
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/ unless it\'s running on heroku and then good luck finding it');
});
