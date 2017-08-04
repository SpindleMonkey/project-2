let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let StashSchema = new Schema({
  name: String, // user names the stash item with whatever they like; will have to deal with dups (or don't allow them?)
  primaryFiber: String,
  otherFibers: [String],
  form: String, // roving, top, batt, fleece, locks, etc. -- use a pulldown
  fiberState: String, // applies only to fleece & locks: raw/unwashed or washed
  blendInfo: String, // this needs to be an array or a pulldown!
  breedInfo: String, // this needs to be an array!
  units: Number, // lbs, oz, grams, etc.
  howManyUnits: Number, // do i care about package size? e.g., 4oz. braid?
  fiberSource: String, // not phase 1; where did you get this fiber? 
  colorFamily: String, // use a pulldown
  colorDetails: String, // this might be an array, too
  dyed: String, // natural or synthetic or undyed
  glitz: Boolean, 
  noils: Boolean, // or neps, or other non-glitzy chunky stuff
  state: String, // sold, converted to yarn, converted to felt, traded, tossed out, given away
  location: String, // not phase 1; garage or house, which room, which bin
  image: String, // not phase 1
  notes: String,
});

let Stash = mongoose.model('Stash', StashSchema);

module.exports = Stash;
