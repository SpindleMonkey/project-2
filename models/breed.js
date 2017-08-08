let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let BreedSchema = new Schema({
  name: String, // breed name
  origin: String, // where did this breed come from?
  status: String, // rare? endangered? US version different from original?
  stapleLength: String,
  fleeceWeight: String,
  fiberDiameter: String,
  description: String,  // official description
  image: String,
  infoSources: [String],  // URL, book info, etc.
  notes: String, // user notes
});

let Breed = mongoose.model('Breed', BreedSchema);

module.exports = Breed;
