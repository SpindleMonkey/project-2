let mongoose = require('mongoose');
let bcrypt= require('bcrypt-nodejs');

Schema = mongoose.Schema;

Stash = require('./stash');
Breed= require('./breed');

let User = new Schema({
  local: {
    email: String,
    password: String,    
  },
  inventory: [Stash.schema],
  breeds: [Breed.schema],
  // favorite breeds
  // favorite sources
  // sources wish list
  // breed wish list
  // blend wish list
});

User.methods.makeHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
