let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let FiberSourceSchema = new Schema({
  business: String, // this entire collection could be a stretch goal
  location: String,
  notes: String
});

let FiberSource = mongoose.model('FiberSource', FiberSourceSchema);

module.exports = FiberSource;
