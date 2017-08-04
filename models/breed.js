let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let BreedSchema = new Schema({
  name: String,
  origin: String,
  status: String, // rare? endangered? US version different from original?
  stapleLength: String,
  fleeceWeight: String,
  fiberDiameter: String,
  description: String,  
  image: String,
  infoSources: [String],
  notes: String,
});

let Breed = mongoose.model('Breed', BreedSchema);

module.exports = Breed;
