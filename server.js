const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');



// from the passport classwork
    // "bcrypt-nodejs": "latest",
    // "body-parser": "~1.0.0",
    // "connect-flash": "~0.1.1",
    // "cookie-parser": "~1.0.0",
    // "ejs": "~0.8.5",
    // "express": "~4.0.0",
    // "express-ejs-layouts": "^1.1.0",
    // "express-session": "~1.0.0",
    // "hbs": "^4.0.0",
    // "method-override": "~1.0.0",
    // "mongoose": "^4.7.2",
    // "morgan": "~1.0.0",
    // "passport": "~0.1.17",
    // "passport-facebook": "~1.0.2",
    // "passport-google-oauth": "~0.1.5",
    // "passport-local": "~0.1.6",
    // "passport-twitter": "~1.0.2"



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

// Home
app.get('/', function homepage(req, res) {
  res.render('index');
});

app.get('/main', function mainpage(req, res) {
  res.render('main');
});


/*
 * JSON API Endpoints
 */

// GET /                  documentation
// GET /breed             list of breeds (names only)
// GET /breed/:name       info for specified breed
// POST /breed            add a new breed
// PUT /breed/:name       update a breed
// DELETE /breed/:name    delete breed

/**********
 * SERVER *
 **********/

// listen on port 3000 if running locally
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/ unless it\'s running on heroku and then good luck finding it');
});
