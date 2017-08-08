let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let FiberSourceSchema = new Schema({
  business: String, // TODO: this entire collection is a stretch goal
  location: String,
  notes: String
});

let FiberSource = mongoose.model('FiberSource', FiberSourceSchema);

module.exports = FiberSource;
