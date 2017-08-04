let mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  'mongodb://localhost/stashy');

module.exports.Breed = require('./breed.js');
module.exports.User = require('./user.js');
module.exports.FiberSource = require('./fibersource.js');
module.exports.Stash = require('./stash.js');