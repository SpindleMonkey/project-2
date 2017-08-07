let mongoose = require('mongoose');
let bcrypt= require('bcrypt-nodejs');
let Breed = require('./breed');

Schema = mongoose.Schema;

Stash = require('./stash');
Breed= require('./breed');

let User = new Schema({
  local: {
    email: String,
    password: String,    
  },
  inventory: [Stash.schema],
  favorites: [Stash.schema],
  avatar: String,
  //breeds: [{type: Schema.Types.ObjectId, ref: 'Breed'}],
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
